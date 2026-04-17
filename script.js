/* ============================================================
   BRIGHT BEAM DENTAL CARE — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL ------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink();
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- ACTIVE NAV LINK ----------------------------------- */
  function updateActiveNavLink() {
    const sections = ['home', 'about', 'services', 'consultation', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(function (id) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          current = id;
        }
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ---- HAMBURGER MENU ------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---- HERO SLIDER --------------------------------------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let currentSlide = 0;
  let slideTimer = null;
  const SLIDE_DURATION = 5500;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, SLIDE_DURATION);
  }

  function stopAutoSlide() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'), 10);
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Pause on hover
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);
  }

  // Start slider
  startAutoSlide();

  /* ---- FAQ ACCORDION ------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    question.addEventListener('click', function () {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all
      faqItems.forEach(function (other) {
        const otherQ = other.querySelector('.faq-q');
        const otherA = other.querySelector('.faq-a');
        otherQ.setAttribute('aria-expanded', 'false');
        otherA.classList.remove('open');
      });

      // Open this one if it was closed
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  /* ---- TESTIMONIALS TOGGLE ------------------------------- */
  const reviewToggle = document.getElementById('reviewToggle');
  const hiddenReviews = document.querySelectorAll('.hidden-review');
  let reviewsExpanded = false;

  if (reviewToggle) {
    reviewToggle.addEventListener('click', function () {
      reviewsExpanded = !reviewsExpanded;

      hiddenReviews.forEach(function (card) {
        if (reviewsExpanded) {
          card.classList.add('visible');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.remove('visible');
        }
      });

      reviewToggle.textContent = reviewsExpanded ? 'Show Less' : 'Show More Reviews';
    });
  }

  /* ---- CONSULTATION FORM --------------------------------- */
  const consultForm = document.getElementById('consultForm');
  const formSuccess = document.getElementById('formSuccess');

  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;

      if (!name || !phone || !service) {
        // Simple validation highlight
        [document.getElementById('fullName'), document.getElementById('phone'), document.getElementById('service')].forEach(function (field) {
          if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.1)';
            field.addEventListener('input', function () {
              field.style.borderColor = '';
              field.style.boxShadow = '';
            }, { once: true });
          }
        });
        return;
      }

      // Simulate submission
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        consultForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(function () {
            formSuccess.classList.remove('visible');
          }, 7000);
        }
      }, 1400);
    });
  }

  /* ---- SMOOTH SCROLL FOR ANCHORS ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---- FADE-IN ON SCROLL (Intersection Observer) --------- */
  const fadeTargets = document.querySelectorAll(
    '.service-card, .review-card, .ba-card, .edu-card, .trust-item, .faq-item'
  );

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeTargets.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (index * 0.06) + 's, transform 0.5s ease ' + (index * 0.06) + 's';
    fadeObserver.observe(el);
  });

  /* ---- KEYFRAME for fade in reviews ---------------------- */
  const style = document.createElement('style');
  style.textContent = '@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }';
  document.head.appendChild(style);

})();