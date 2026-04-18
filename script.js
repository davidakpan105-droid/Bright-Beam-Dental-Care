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
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let current  = 0;
  let slideTimer;

  const goTo = (idx) => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  };

  const startSlider = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goTo(current + 1), 5500);
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


  /* ── BEFORE & AFTER TOGGLE ─────────────────── */
  const baToggleBtn  = document.getElementById('ba-toggle');
  const hiddenBaCards = document.querySelectorAll('.ba-card.hidden');
  let baExpanded = false;

  baToggleBtn.addEventListener('click', () => {
    baExpanded = !baExpanded;
    hiddenBaCards.forEach(card => {
      card.style.display = baExpanded ? 'block' : 'none';
    });
    baToggleBtn.textContent = baExpanded ? 'Show Less' : 'See More Results';
  });


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