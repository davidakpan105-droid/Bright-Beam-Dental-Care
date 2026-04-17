// ============================================================
//  BRIGHT BEAM DENTAL CARE — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // back to top
    const backTop = document.querySelector('.back-top');
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ===== HAMBURGER / MOBILE NAV =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== HERO SLIDER =====
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  if (slides.length > 0) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
    startSlider();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(i);
        startSlider();
      });
    });

    document.querySelector('.slider-arrow.prev')?.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(currentSlide - 1);
      startSlider();
    });
    document.querySelector('.slider-arrow.next')?.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(currentSlide + 1);
      startSlider();
    });
  }

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  // ===== FAQ =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(fi => fi.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== BACK TO TOP =====
  const backTop = document.querySelector('.back-top');
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});