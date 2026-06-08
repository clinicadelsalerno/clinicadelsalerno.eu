(function ($) {
  
  "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // REVIEWS CAROUSEL
    $('.reviews-carousel').owlCarousel({
        center: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 12000,
        autoplaySpeed: 1200,
        smartSpeed: 1200,
        responsive:{
          0:{
            items:1,
          },
          768:{
            items:2,
            margin: 100,
          },
          1280:{
            items:2,
            margin: 100,
          }
        }
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

      var ReviewsOwlItem = $('.reviews-carousel .owl-item').width();

      $('.reviews-carousel .owl-nav').css({'width' : (ReviewsOwlItem) + 'px'});
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
