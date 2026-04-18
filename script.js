/* =============================================
   BRIGHT BEAM DENTAL CARE — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ── HAMBURGER MENU ────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ── HERO SLIDER ───────────────────────────── */
  const slides      = document.querySelectorAll('.hero-slide');
  const dots        = document.querySelectorAll('.hero-dot');
  const textSlides  = document.querySelectorAll('.hero-text-slide');
  let current       = 0;
  let slideTimer;

  const goTo = (idx) => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    if (textSlides[current]) textSlides[current].classList.remove('active');

    current = (idx + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (textSlides[current]) {
      textSlides[current].classList.remove('active');
      // Force reflow so animation replays each time
      void textSlides[current].offsetWidth;
      textSlides[current].classList.add('active');
    }
  };

  const startSlider = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goTo(current + 1), 6000);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startSlider(); });
  });

  startSlider();


  /* ── SERVICES TOGGLE ──────────────────────── */
  const svcToggleBtn  = document.getElementById('svc-toggle');
  const hiddenSvcCards = document.querySelectorAll('.service-card.hidden');
  let svcExpanded = false;

  svcToggleBtn.addEventListener('click', () => {
    svcExpanded = !svcExpanded;
    hiddenSvcCards.forEach(card => {
      card.style.display = svcExpanded ? 'flex' : 'none';
    });
    svcToggleBtn.textContent = svcExpanded ? 'Show Less' : 'View More Services';
  });



  /* BEFORE & AFTER toggle moved to bottom of file (new compare slider version) */



  /* ── TESTIMONIALS TOGGLE ───────────────────── */
  const testiToggleBtn  = document.getElementById('testi-toggle');
  const hiddenTestiCards = document.querySelectorAll('.testi-card.hidden');
  let testiExpanded = false;

  testiToggleBtn.addEventListener('click', () => {
    testiExpanded = !testiExpanded;
    hiddenTestiCards.forEach(card => {
      card.style.display = testiExpanded ? 'flex' : 'none';
    });
    testiToggleBtn.textContent = testiExpanded ? 'Show Less' : 'View More Reviews';
  });


  /* ── FAQ ACCORDION ─────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  /* ── SCROLL REVEAL ─────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => io.observe(el));


  /* ── BACK TO TOP ───────────────────────────── */
  document.getElementById('back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── SMOOTH ANCHOR SCROLL ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});


  /* ── WHY US TOGGLE (show more) ─────────────── */
  const whyToggleBtn = document.getElementById('why-toggle');
  const whyExtraCards = document.querySelectorAll('.why-card-extra');
  let whyExpanded = false;

  if (whyToggleBtn) {
    whyToggleBtn.addEventListener('click', () => {
      whyExpanded = !whyExpanded;
      whyExtraCards.forEach(c => {
        c.style.display = whyExpanded ? 'block' : 'none';
      });
      whyToggleBtn.textContent = whyExpanded ? 'Show Less' : 'See More Reasons';
      // Re-init carousel after DOM change
      initWhyCarousel();
    });
  }


  /* ── WHY CAROUSEL (mobile) ────────────────── */
  function initWhyCarousel() {
    const carousel    = document.getElementById('whyCarousel');
    const dotsWrap    = document.getElementById('whyDots');
    const prevBtn     = document.getElementById('whyPrev');
    const nextBtn     = document.getElementById('whyNext');

    if (!carousel) return;

    const isMobile = () => window.innerWidth <= 640;
    if (!isMobile()) return;

    const allCards = Array.from(carousel.querySelectorAll('.why-card')).filter(c => c.style.display !== 'none');
    let current = 0;

    const render = () => {
      allCards.forEach((c, i) => {
        c.classList.toggle('carousel-active', i === current);
      });
      // Dots
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        allCards.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'why-dot' + (i === current ? ' active' : '');
          dot.setAttribute('aria-label', 'Go to feature ' + (i + 1));
          dot.addEventListener('click', () => { current = i; render(); });
          dotsWrap.appendChild(dot);
        });
      }
    };

    if (prevBtn) prevBtn.onclick = () => { current = (current - 1 + allCards.length) % allCards.length; render(); };
    if (nextBtn) nextBtn.onclick = () => { current = (current + 1) % allCards.length; render(); };

    render();
  }

  initWhyCarousel();
  window.addEventListener('resize', initWhyCarousel);


  /* ── BEFORE & AFTER COMPARE SLIDERS ────────── */
  function initCompareSliders() {
    document.querySelectorAll('.ba-compare-inner').forEach(wrap => {
      const beforeImg = wrap.querySelector('.ba-before-img');
      const handle    = wrap.querySelector('.ba-handle');
      let dragging    = false;

      const setPos = (x) => {
        const rect  = wrap.getBoundingClientRect();
        let pct     = ((x - rect.left) / rect.width) * 100;
        pct         = Math.max(5, Math.min(95, pct));
        beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left        = pct + '%';
      };

      // Mouse
      handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
      window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
      window.addEventListener('mouseup',   () => { dragging = false; });

      // Touch
      handle.addEventListener('touchstart', e => { dragging = true; }, { passive: true });
      window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('touchend',  () => { dragging = false; });
    });
  }

  initCompareSliders();


  /* ── BA EXTRA TOGGLE (re-init sliders) ──────── */
  const baToggleBtn2 = document.getElementById('ba-toggle');
  const baExtraCards = document.querySelectorAll('.ba-extra');
  let baExpanded2 = false;

  if (baToggleBtn2) {
    baToggleBtn2.addEventListener('click', () => {
      baExpanded2 = !baExpanded2;
      baExtraCards.forEach(card => {
        card.style.display = baExpanded2 ? 'block' : 'none';
      });
      baToggleBtn2.textContent = baExpanded2 ? 'Show Less' : 'See More Results';
      if (baExpanded2) initCompareSliders();
    });
  }