#!/usr/bin/env python3
"""
Aggiorna il file pubblico data/google-reviews.json con le recensioni
della Clinica del Salerno tramite Google Business Profile API.

Credenziali richieste nelle variabili d'ambiente:
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  GOOGLE_REFRESH_TOKEN

Le credenziali non vengono mai scritte nel JSON pubblico.
"""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


TOKEN_URL = "https://oauth2.googleapis.com/token"
REVIEWS_BASE_URL = "https://mybusiness.googleapis.com/v4"

DEFAULT_ACCOUNT_ID = "116875977301081388762"
DEFAULT_LOCATION_ID = "10120590755630608448"

BUSINESS_NAME = "Clinica del Salerno"
REVIEW_URL = "https://g.page/r/CbtSshYPfTiIEAE/review"
OUTPUT_PATH = Path(os.getenv("GOOGLE_REVIEWS_OUTPUT", "data/google-reviews.json"))

RETRYABLE_STATUS = {429, 500, 502, 503, 504}


def required_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Variabile d'ambiente mancante: {name}")
    return value


def http_json(
    url: str,
    *,
    method: str = "GET",
    data: dict[str, str] | None = None,
    headers: dict[str, str] | None = None,
    retries: int = 3,
) -> dict[str, Any]:
    encoded_data = None
    request_headers = {
        "Accept": "application/json",
        "User-Agent": "Clinica-del-Salerno-Google-Reviews/1.0",
    }

    if headers:
        request_headers.update(headers)

    if data is not None:
        encoded_data = urllib.parse.urlencode(data).encode("utf-8")
        request_headers["Content-Type"] = "application/x-www-form-urlencoded"

    for attempt in range(1, retries + 1):
        request = urllib.request.Request(
            url,
            data=encoded_data,
            headers=request_headers,
            method=method,
        )

        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                raw = response.read().decode("utf-8")
                return json.loads(raw) if raw else {}

        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            if exc.code in RETRYABLE_STATUS and attempt < retries:
                time.sleep(2 ** (attempt - 1))
                continue
            raise RuntimeError(
                f"Richiesta Google fallita: HTTP {exc.code}. "
                f"Risposta: {body[:600]}"
            ) from exc

        except urllib.error.URLError as exc:
            if attempt < retries:
                time.sleep(2 ** (attempt - 1))
                continue
            raise RuntimeError(f"Errore di rete durante la richiesta a Google: {exc}") from exc

        except json.JSONDecodeError as exc:
            raise RuntimeError("Google ha restituito una risposta JSON non valida.") from exc

    raise RuntimeError("Richiesta Google non completata.")


def get_access_token() -> str:
    payload = http_json(
        TOKEN_URL,
        method="POST",
        data={
            "client_id": required_env("GOOGLE_CLIENT_ID"),
            "client_secret": required_env("GOOGLE_CLIENT_SECRET"),
            "refresh_token": required_env("GOOGLE_REFRESH_TOKEN"),
            "grant_type": "refresh_token",
        },
    )

    token = str(payload.get("access_token", "")).strip()
    if not token:
        raise RuntimeError("Google non ha restituito un access token.")
    return token


def fetch_all_reviews(access_token: str) -> tuple[list[dict[str, Any]], float, int]:
    account_id = os.getenv("GOOGLE_ACCOUNT_ID", DEFAULT_ACCOUNT_ID).strip()
    location_id = os.getenv("GOOGLE_LOCATION_ID", DEFAULT_LOCATION_ID).strip()

    parent = f"accounts/{account_id}/locations/{location_id}"
    endpoint = f"{REVIEWS_BASE_URL}/{parent}/reviews"

    headers = {"Authorization": f"Bearer {access_token}"}
    reviews: list[dict[str, Any]] = []
    page_token = ""
    average_rating = 0.0
    total_review_count = 0
    first_page = True

    while True:
        params = {
            "pageSize": "50",
            "orderBy": "updateTime desc",
        }
        if page_token:
            params["pageToken"] = page_token

        url = endpoint + "?" + urllib.parse.urlencode(params)
        payload = http_json(url, headers=headers)

        page_reviews = payload.get("reviews", [])
        if isinstance(page_reviews, list):
            reviews.extend(item for item in page_reviews if isinstance(item, dict))

        if first_page:
            try:
                average_rating = float(payload.get("averageRating", 0) or 0)
            except (TypeError, ValueError):
                average_rating = 0.0

            try:
                total_review_count = int(payload.get("totalReviewCount", 0) or 0)
            except (TypeError, ValueError):
                total_review_count = 0

            first_page = False

        page_token = str(payload.get("nextPageToken", "") or "").strip()
        if not page_token:
            break

    return reviews, average_rating, total_review_count


def normalize_review(review: dict[str, Any]) -> dict[str, Any]:
    reviewer = review.get("reviewer")
    if not isinstance(reviewer, dict):
        reviewer = {}

    is_anonymous = bool(reviewer.get("isAnonymous", False))
    display_name = str(reviewer.get("displayName", "") or "").strip()
    profile_photo = str(reviewer.get("profilePhotoUrl", "") or "").strip()

    if is_anonymous or not display_name:
        display_name = "Utente Google"
    if is_anonymous:
        profile_photo = ""

    raw_media = review.get("reviewMediaItems")
    if not isinstance(raw_media, list):
        raw_media = []

    media_items: list[dict[str, str]] = []
    for item in raw_media:
        if not isinstance(item, dict):
            continue

        media: dict[str, str] = {}

        thumbnail_url = str(item.get("thumbnailUrl", "") or "").strip()
        thumbnail_label = str(item.get("thumbnailLabel", "") or "").strip()
        video_url = str(item.get("videoUrl", "") or "").strip()

        if thumbnail_url:
            media["thumbnailUrl"] = thumbnail_url
        if thumbnail_label:
            media["thumbnailLabel"] = thumbnail_label
        if video_url:
            media["videoUrl"] = video_url

        if media:
            media_items.append(media)

    normalized = {
        "reviewId": str(review.get("reviewId", "") or "").strip(),
        "reviewer": {
            "displayName": display_name,
            "profilePhotoUrl": profile_photo,
        },
        "starRating": str(review.get("starRating", "") or "").strip(),
        "comment": str(review.get("comment", "") or "").strip(),
    }

    if media_items:
        normalized["reviewMediaItems"] = media_items

    return normalized


def build_public_payload(
    reviews: list[dict[str, Any]],
    average_rating: float,
    total_review_count: int,
) -> dict[str, Any]:
    normalized = [normalize_review(review) for review in reviews]

    return {
        "businessName": BUSINESS_NAME,
        "provider": "Google",
        "rating": round(average_rating, 1),
        "totalReviews": total_review_count or len(normalized),
        "reviewUrl": REVIEW_URL,
        "reviews": normalized,
    }


def write_json_if_changed(payload: dict[str, Any]) -> bool:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    new_text = json.dumps(
        payload,
        ensure_ascii=False,
        indent=2,
        sort_keys=False,
    ) + "\n"

    old_text = ""
    if OUTPUT_PATH.exists():
        old_text = OUTPUT_PATH.read_text(encoding="utf-8")

    if old_text == new_text:
        print(f"Nessuna modifica: {OUTPUT_PATH}")
        return False

    OUTPUT_PATH.write_text(new_text, encoding="utf-8", newline="\n")
    print(f"Aggiornato: {OUTPUT_PATH}")
    return True


def main() -> int:
    try:
        print("Richiedo un access token Google...")
        access_token = get_access_token()

        print("Scarico le recensioni Google Business Profile...")
        reviews, average_rating, total_review_count = fetch_all_reviews(access_token)

        payload = build_public_payload(reviews, average_rating, total_review_count)
        changed = write_json_if_changed(payload)

        print(
            f"Recensioni ricevute: {len(reviews)} | "
            f"Totale Google: {payload['totalReviews']} | "
            f"Media: {payload['rating']:.1f}"
        )
        print("JSON modificato." if changed else "JSON già aggiornato.")
        return 0

    except Exception as exc:
        print(f"ERRORE: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
