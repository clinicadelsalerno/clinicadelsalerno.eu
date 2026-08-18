(function ($) {
  
  "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // Banner Carousel
    // Banner Carousel — avvio automatico, niente pausa su hover, opzioni forzate
(function () {
  var el = document.getElementById('myCarousel');
  if (!el || !window.bootstrap || !bootstrap.Carousel) return;

  // Se esiste già un'istanza creata dai data-attributes, eliminala
  var existing = bootstrap.Carousel.getInstance(el);
  if (existing) existing.dispose();

  // Re-init con le impostazioni volute
  var car = new bootstrap.Carousel(el, {
    interval: 3300,   // 3.3s
    pause: false,     // <— fondamentale: NON mettere in pausa all’hover
    wrap: true,
    touch: true
  });

  // Avvia esplicitamente il ciclo
  car.cycle();
})();


    // REVIEWS NAVIGATION
    function ReviewsNavResize(){

   // PROVA   $(".navbar").scrollspy({ offset: -94 });

if (window.bootstrap && bootstrap.ScrollSpy) {
  try {
    new bootstrap.ScrollSpy(document.body, { target: '#navbarNav', offset: 94 });
  } catch (e) {}
}

    }

    $(window).on("resize", ReviewsNavResize);
    $(document).on("ready", ReviewsNavResize);

    // HREF LINKS
    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 74
          }, 1000);
        }
      }
    });
    
  })(window.jQuery);
document.addEventListener("DOMContentLoaded", function () {
  const faqAnswers = [
    "L'Haloterapia Controllata è un trattamento naturale che prevede la respirazione di particelle ionizzate di sale micronizzato al momento, in un ambiente confinato e controllato.",
    "Perché senza un sensore, che monitora e regola costantemente la concentrazione salina, erogando più sale micronizzato quando è necessario, l'efficacia del trattamento risulterebbe dipendente dalla capacità polmonare dei pazienti e dal loro numero nella stanza. Due adulti, ad esempio, respirano mediamente il doppio di uno solo. Per questo non è pensabile da parte nostra erogare una stessa quantità standardizzata di sale a più persone.",
    "Perché le particelle, che si formano in seguito alla micronizzazione fatta al momento, si ionizzano, garantendo i benefici che il sale già frantumato non può offrire. Inoltre, riescono a rimanere separate tra loro senza l'uso di additivi iodati o di sale non polverizzato, raggiungendo così anche le basse vie respiratorie.",
    "Sì. Utilizziamo un dispositivo medico certificato dal ministero della Salute Italiano, marcato CE, alimentato da un impianto elettrico ad uso medicale e siamo in possesso di tutte le autorizzazioni necessarie per espletare l’attività di Haloterapia Controllata.",
    "La durata complessiva di un appuntamento per una singola seduta è di 40 minuti, con una permanenza minima nella stanza del sale pari a 30 minuti di effettiva erogazione.",
    "Dipende dalla condizione da trattare: varia da un minimo di 12 sedute per le patologie più lievi, fino a cicli da 30 sedute per quelle più severe, preferibilmente a cadenza giornaliera.",
    "Sì. I bambini non tollerano costrizioni al volto, trattamenti invasivi e ambienti claustrofobici. Grazie alla capiente stanza ricoperta di sale, i tanti giochi che mettiamo a disposizione, i mille colori delle luci e la musica personalizzata, i bambini potranno usufruire del trattamento divertendosi in un ambiente che apparirà loro magico.",
    "Cloruro di sodio con grado di purezza farmaceutica, conforme alla Farmacopea Europea, acquistato da entri terzi; non abbiamo divisioni con le quali ci autocerfichiamo la purezza del sale e non adoperiamo sale alimentare iodato né altri additivi antiagglomeranti. Il sale grosso a terra (e sulle pareti), invece, ha una funzione quasi del tutto estetica e antisettica e viene regolarmente sostituito.",
    "Perché i sali colorati sono impuri per il [2-5]%. Vengono spacciati come ricchi di svariati 'oligoelementi'; in realtà si tratta di metalli cancerogeni, se respirati. Facciamo mangiare spinaci ai nostri bambini, ma non ci sogneremmo mai di far inalare loro la polvere di ferro.",
    "Perché i costi della pubblicità sono pagati dal paziente (ci aveva mai pensato?). L’Haloterapia Controllata NON è un metodo commerciale di franchising per massimizzare i profitti per massimizzare i profitti, ma un trattamento naturale che da oltre trent’anni è riconosciuto nel Mondo come un riferimento per la cura delle malattie respiratorie e cutanee.",
    "Copriscarpe e cuffietta monouso che forniamo gratuitamente noi. I bambini, invece, un paio di calzini puliti sopra quelli che indossano, in modo da poter giocare nel sale sul pavimento liberamente, come in spiaggia. La stanza dispone di poltrone ergonomiche con poggiatesta. Consigliamo un abbigliamento comodo.",
    "Le controindicazioni più comuni nei pazienti sani possono essere una leggera secchezza nasale-orofaringea e uno stimolo tussigeno con conseguente espettorazione come effetto benefico della mobilitazione del muco. Per condizioni cliniche particolari sarà in ogni caso somministrato un consenso informato prima del trattamento.",
    "A seconda dell'esclusività e personalizzazione del trattamento, il prezzo a persona per una seduta singola di un ciclo parte da circa 16 euro, con una media di 24. Il genitore che accompagna il bambino entra gratis. Inoltre mettiamo a disposizione importanti scontistiche (fino al 75%) per ulteriori figli o gruppi e famiglie numerose che scelgono di effettuare il ciclo di sedute assieme.",
    "Vista la sola recente diffusione di dispositivi medici certificati per haloterapia controllata nel mercato italiano, sebbene sia già possibile detrarne la spesa per il fitto, è ancora in corso la procedura burocratica di approvazione da parte del Ministero della Salute e l'Agenzia delle Entrate per poter far detrarre anche le relative spese per il servizio del trattamento di haloterapia controllata."
  ];

  window.showAnswer = function(index) {
    const buttons = document.querySelectorAll('.faq-btn');
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const defaultImg = document.getElementById('faq-default-img');
    const answerText = document.getElementById('faq-answer-text');

    if (defaultImg && answerText) {
      defaultImg.classList.add('d-none');
      answerText.textContent = faqAnswers[index];
      answerText.classList.remove('d-none');
    }
  };
});

// === Hook per aprire il modal "Cookie Policy" ===
document.addEventListener('DOMContentLoaded', function(){
  var policyEl = document.getElementById('cookiePolicyModal');
  var policyModal = policyEl ? new bootstrap.Modal(policyEl) : null;

  // Apri il modal quando si clicca su QUALSIASI link a /cookie-policy
  document.querySelectorAll('a[href="/cookie-policy"]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      policyModal && policyModal.show();
    });
  });

  // Dalla policy → apri direttamente il modal Preferenze (riusa il pulsante già presente)
  var openPrefs = document.getElementById('open-cookie-preferences-from-policy');
  if (openPrefs) {
    openPrefs.addEventListener('click', function(e){
      e.preventDefault();
      var btn = document.getElementById('cookie-preferences');
      if (btn) btn.click();
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var policyEl = document.getElementById('cookiePolicyModal');
  var openPrefsLink = document.getElementById('open-cookie-preferences-from-policy');

  if (policyEl && openPrefsLink) {
    openPrefsLink.addEventListener('click', function (e) {
      e.preventDefault();
      var policyModal = bootstrap.Modal.getInstance(policyEl) || new bootstrap.Modal(policyEl);

      // Quando la policy si chiude, apri il modal preferenze (riusa il tuo bottone esistente)
      policyEl.addEventListener('hidden.bs.modal', function handler() {
        policyEl.removeEventListener('hidden.bs.modal', handler);
        var btn = document.getElementById('cookie-preferences');
        if (btn) btn.click();
      });

      policyModal.hide();
    });
  }
});

// ---- INVIO FORM "Scrivici" VIA AJAX (Formspree) ----
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var submitBtn = document.getElementById('submit-button');
  var endpoint = form.getAttribute('action');

  function safeShowThankYouModal() {
    try {
      var tyEl = document.getElementById('thankYouModal');
      if (!tyEl || !window.bootstrap || !bootstrap.Modal) return;

      // Compat: Bootstrap 5.0.x non ha getOrCreateInstance
      var modalInstance = (bootstrap.Modal.getInstance && bootstrap.Modal.getInstance(tyEl)) || new bootstrap.Modal(tyEl);
      modalInstance.show();
    } catch (e) {
      // Non mandare l'utente nel catch principale: fall-back silenzioso
      console.warn('Impossibile aprire il modal di ringraziamento:', e);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio...';
    }

    var formData = new FormData(form);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    })
    .then(function (res) {
      // Formspree risponde 200/OK su successo
      if (!res.ok) throw new Error('Errore di invio');
      // Prova ad aprire il modal (compat con BS 5.0.x)
      safeShowThankYouModal();

      // Reset form e privacy
      form.reset();
      var chk = document.getElementById('privacyCheck');
      if (chk) chk.checked = false;
    })
    .catch(function () {
      // Mostra un messaggio minimale SOLO se la richiesta fallisce davvero
      alert('Ops, qualcosa è andato storto. Puoi riprovare tra poco oppure chiamarci al 378 418 0878.');
    })
    .finally(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'INVIA';
      }
    });
  });
});


// ---- GOOGLE REVIEWS WIDGET DINAMICO ----
document.addEventListener('DOMContentLoaded', function () {
  var widget = document.querySelector('[data-google-reviews-widget]');
  if (!widget) return;

  var source = widget.getAttribute('data-reviews-source') || 'data/google-reviews.json';
  var reviewUrl = widget.getAttribute('data-review-url') || 'https://g.page/r/CbtSshYPfTiIEAE/review';
  var carousel = widget.querySelector('.google-live-reviews-carousel');
  var ratingEl = widget.querySelector('[data-google-rating]');
  var totalEl = widget.querySelector('[data-google-total]');
  var summaryStarsEl = widget.querySelector('.google-reviews-stars');
  var writeBtn = widget.querySelector('.google-reviews-write-btn');

  if (!carousel) return;

  /*
   * Solo anteprima locale (file://): serve a poter aprire index.html con doppio clic
   * prima della pubblicazione. Sul sito online NON sostituisce mai data/google-reviews.json.
   */
  var offlinePreviewData = {
    businessName: 'Clinica del Salerno',
    provider: 'Google',
    rating: 5.0,
    totalReviews: 19,
    reviewUrl: reviewUrl,
    reviews: [
      {
        reviewer: { displayName: 'Titti Franco', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'Consiglio la Haloterapia a tutti! Mio figlio soffre di muco timpano cristallizzato da anni. Il suo udito ormai stava scomparendo, creandogli gravi disagi nella vita quotidiana. Abbiamo sperimentato, prima di un ipotetico intervento chirurgico, la terapia presso la Clinica del Salerno con risultati molto positivi.'
      },
      {
        reviewer: { displayName: 'Ipa Пасічник', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'Esperienza bellissima, personale gentile e disponibile, posto pulito ed accogliente. Grazie di tutto.'
      },
      {
        reviewer: { displayName: 'Valeria Pugliese', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'La Clinica del Salerno è un luogo accogliente dove trovare relax e benefici per la salute respiratoria. Personale gentile, ambienti puliti e risultati concreti: consigliatissima per chi cerca un benessere naturale.'
      },
      {
        reviewer: { displayName: 'Madre del paziente', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: "Mio figlio soffre di ipertrofia dei turbinati, delle tonsille e delle adenoidi. Sono entusiasta dei risultati ottenuti già dopo poche sedute: sta espellendo i muchi, respira molto meglio e il suo stato generale di salute è migliorato. L'ambiente è gradevole e rilassante. I titolari sono professionali e disponibili. Consiglio vivamente questa struttura."
      },
      {
        reviewer: { displayName: 'Coppia di pazienti', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'Con mia moglie abbiamo fatto insieme un ciclo completo di sedute. Dopo solo 3 sedute, abbiamo notato notevoli miglioramenti. Dormiamo meglio e il riposo notturno è più soddisfacente. Stiamo raccomandando questo trattamento a familiari ed amici.'
      },
      {
        reviewer: { displayName: 'Paziente', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'Il mio otorinolaringoiatra mi ha prescritto un ciclo di sedute presso questa clinica. Inizialmente ero titubante, ma ho riscontrato che funziona. Inoltre il centro è nuovo e pulito ed il personale è cordiale.'
      },
      {
        reviewer: { displayName: 'Madre della paziente', profilePhotoUrl: '' },
        starRating: 'FIVE',
        comment: 'Struttura molto bella, nuova e pulita. Volevo ringraziare Rosa e Andrea per la loro professionalità, umanità e attenzione. Grazie alla terapia abbiamo risolto il problema delle adenoidi e abbiamo scampato l’intervento alla piccola. Grazie di cuore.'
      }
    ]
  };

  function normalizeRating(value) {
    if (typeof value === 'number' && isFinite(value)) return value;
    var numeric = Number(value);
    if (isFinite(numeric) && numeric > 0) return numeric;
    var map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    return map[String(value || '').toUpperCase()] || 0;
  }

  function initials(name) {
    return String(name || 'G')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(function (part) { return part.charAt(0).toUpperCase(); })
      .join('') || 'G';
  }

  function starString(value) {
    var n = Math.max(0, Math.min(5, Math.round(normalizeRating(value))));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }

  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function createGoogleGIcon() {
    var badge = createEl('span', 'google-review-provider');
    badge.setAttribute('aria-label', 'Recensione Google');
    badge.innerHTML = '<svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">' +
      '<path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>' +
      '<path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.583-5.036-3.71H.957v2.331C2.438 15.983 5.482 18 9 18z"/>' +
      '<path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>' +
      '<path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.581C13.463.892 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>' +
      '</svg>';
    return badge;
  }

  function getFirstReviewMedia(review) {
    var items = Array.isArray(review.reviewMediaItems) ? review.reviewMediaItems : [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i] || {};
      var url = item.thumbnailUrl || item.mediaUrl || item.url || '';
      if (url) return url;
    }

    return '';
  }

  function destroyOwlIfNeeded() {
    if (!window.jQuery || !jQuery.fn || !jQuery.fn.owlCarousel) return;

    var $carousel = jQuery(carousel);
    if ($carousel.hasClass('owl-loaded')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.removeClass('owl-loaded owl-hidden owl-drag owl-grab');
    }
  }

  function appendAvatar(person, name, photoUrl) {
    if (!photoUrl) {
      person.appendChild(createEl('div', 'google-review-avatar', initials(name)));
      return;
    }

    var img = createEl('img', 'google-review-avatar-img');
    img.src = photoUrl;
    img.alt = '';
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', function () {
      if (!img.parentNode) return;
      img.parentNode.replaceChild(createEl('div', 'google-review-avatar', initials(name)), img);
    }, { once: true });
    person.appendChild(img);
  }

  function buildCard(review) {
    review = review || {};

    var reviewer = review.reviewer || {};
    var rating = normalizeRating(review.starRating || review.rating);
    var name = reviewer.displayName || review.displayName || 'Paziente Google';
    var photo = reviewer.profilePhotoUrl || review.profilePhotoUrl || '';
    var text = review.comment || review.text || '';
    var media = getFirstReviewMedia(review);

    var card = createEl('article', 'google-review-card');
    var inner = createEl('div', 'google-review-card-inner');
    var header = createEl('div', 'google-review-header');
    var person = createEl('div', 'google-review-person');

    appendAvatar(person, name, photo);

    var meta = createEl('div', 'google-review-meta');
    meta.appendChild(createEl('span', 'google-review-name', name));
    person.appendChild(meta);

    header.appendChild(person);
    header.appendChild(createGoogleGIcon());
    inner.appendChild(header);

    var stars = createEl('div', 'google-review-card-stars', starString(rating));
    stars.setAttribute('aria-label', (rating || 0) + ' stelle su 5');
    inner.appendChild(stars);

    var textWrap = createEl('div', 'google-review-text-wrap');
    var textBox = createEl('div', 'google-review-text-box');
    var paragraph = createEl('p', 'google-review-text', text);

    if (text.length > 210) paragraph.classList.add('is-collapsed');
    textBox.appendChild(paragraph);

    if (text.length > 210) {
      var more = createEl('button', 'google-review-more', 'Leggi di più');
      more.type = 'button';
      more.addEventListener('click', function () {
        paragraph.classList.toggle('is-collapsed');
        more.textContent = paragraph.classList.contains('is-collapsed') ? 'Leggi di più' : 'Mostra meno';
      });
      textBox.appendChild(more);
    }

    textWrap.appendChild(textBox);

    if (media) {
      var mediaImg = createEl('img', 'google-review-media');
      mediaImg.src = media;
      mediaImg.alt = 'Foto allegata alla recensione Google';
      mediaImg.loading = 'lazy';
      mediaImg.referrerPolicy = 'no-referrer';
      mediaImg.addEventListener('error', function () {
        if (mediaImg.parentNode) mediaImg.remove();
      }, { once: true });
      textWrap.appendChild(mediaImg);
    }

    inner.appendChild(textWrap);
    card.appendChild(inner);

    return card;
  }

  function showUnavailable() {
    destroyOwlIfNeeded();
    carousel.innerHTML = '';
    carousel.appendChild(createEl('div', 'google-reviews-empty', 'Recensioni Google temporaneamente non disponibili.'));
  }

  function render(data) {
    data = data || {};

    var reviews = Array.isArray(data.reviews) ? data.reviews : [];
    var average = normalizeRating(data.rating || data.averageRating);
    var total = Number(data.totalReviews || data.totalReviewCount || reviews.length || 0);
    var liveReviewUrl = data.reviewUrl || reviewUrl;

    if (ratingEl) ratingEl.textContent = average ? average.toFixed(1) : '—';
    if (totalEl) totalEl.textContent = total;
    if (summaryStarsEl && average) {
      summaryStarsEl.textContent = starString(average);
      summaryStarsEl.setAttribute('aria-label', average.toFixed(1) + ' stelle su 5');
    }
    if (writeBtn) writeBtn.href = liveReviewUrl;

    destroyOwlIfNeeded();
    carousel.innerHTML = '';

    if (!reviews.length) {
      showUnavailable();
      return;
    }

    reviews.forEach(function (review) {
      carousel.appendChild(buildCard(review));
    });

    if (window.jQuery && jQuery.fn && jQuery.fn.owlCarousel) {
      jQuery(carousel).owlCarousel({
        loop: reviews.length > 3,
        nav: true,
        dots: true,
        autoplay: reviews.length > 1,
        autoplayTimeout: 7000,
        autoplaySpeed: 800,
        autoplayHoverPause: false,
        smartSpeed: 800,
        margin: 16,
        responsive: {
          0: { items: 1 },
          768: { items: Math.min(2, reviews.length) },
          1100: { items: Math.min(3, reviews.length) }
        }
      });
    }
  }

  if (window.location.protocol === 'file:') {
    render(offlinePreviewData);
    return;
  }

  fetch(source, { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('File recensioni non disponibile: HTTP ' + response.status);
      return response.json();
    })
    .then(render)
    .catch(function (error) {
      console.warn('Impossibile caricare le recensioni Google:', error);
      showUnavailable();
    });
});
