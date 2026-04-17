/* ============================================================
   BRIGHT BEAM DENTAL CARE — script.js
   All interactive functionality
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------- NAVBAR ---------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    updateActiveNavLink();
    handleBackToTop();
    handleRevealAnimations();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ---------------------- ACTIVE NAV LINK ---------------------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ---------------------- HERO SLIDER ---------------------- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let sliderTimer = null;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    sliderTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(sliderTimer);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      goToSlide(index);
      resetAutoSlide();
    });
  });

  // Pause on hover
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
  }

  // Touch swipe for slider
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroSlider) {
    heroSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoSlide();
      }
    }, { passive: true });
  }

  startAutoSlide();

  /* ---------------------- FAQ ACCORDION ---------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.faq-answer');
    firstItem.classList.add('open');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  /* ---------------------- TESTIMONIALS TOGGLE ---------------------- */
  const toggleBtn = document.getElementById('toggleReviews');
  const hiddenReviews = document.querySelectorAll('.hidden-review');
  let reviewsVisible = false;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      reviewsVisible = !reviewsVisible;

      hiddenReviews.forEach(function (review) {
        if (reviewsVisible) {
          review.classList.add('show');
        } else {
          review.classList.remove('show');
        }
      });

      toggleBtn.textContent = reviewsVisible ? 'Show Less Reviews' : 'Show More Reviews';
    });
  }

  /* ---------------------- CONSULTATION FORM ---------------------- */
  const consultForm = document.getElementById('consultationForm');
  const formSuccess = document.getElementById('formSuccess');

  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;

      if (!name || !phone || !service) {
        highlightEmptyFields();
        return;
      }

      // Simulate submission
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        consultForm.classList.add('hidden');
        formSuccess.classList.add('visible');

        // WhatsApp redirect with pre-filled message
        const message = encodeURIComponent(
          'Hello Bright Beam Dental Care,\n\nI would like to book a consultation.\n\nName: ' + name +
          '\nPhone: ' + phone +
          '\nService: ' + service +
          '\n\nPlease confirm my appointment.'
        );
        window.open('https://wa.me/2347039625531?text=' + message, '_blank');
      }, 1200);
    });
  }

  function highlightEmptyFields() {
    const required = consultForm.querySelectorAll('[required]');
    required.forEach(function (field) {
      if (!field.value.trim() || (field.tagName === 'SELECT' && !field.value)) {
        field.style.borderColor = '#DC2626';
        field.addEventListener('input', function () {
          field.style.borderColor = '';
        }, { once: true });
        field.addEventListener('change', function () {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    // Scroll to first empty required field
    const firstEmpty = Array.from(required).find(function (f) {
      return !f.value.trim() || (f.tagName === 'SELECT' && !f.value);
    });
    if (firstEmpty) {
      firstEmpty.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstEmpty.focus();
    }
  }

  /* ---------------------- BACK TO TOP ---------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------- REVEAL ANIMATIONS ---------------------- */
  const revealElements = document.querySelectorAll(
    '.service-card, .ba-card, .testimonial-card, .edu-card, .trust-item, .about-grid, .consultation-grid, .ba-grid'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  function handleRevealAnimations() {
    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('in-view');
      }
    });
  }

  handleRevealAnimations();

  /* ---------------------- SMOOTH ANCHOR SCROLLING ---------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 76;
        const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  /* ---------------------- STAGGER SERVICE CARDS ---------------------- */
  function staggerCards() {
    const cards = document.querySelectorAll('.services-grid .service-card');
    cards.forEach(function (card, index) {
      card.style.transitionDelay = (index * 0.08) + 's';
    });

    const baCards = document.querySelectorAll('.ba-grid .ba-card');
    baCards.forEach(function (card, index) {
      card.style.transitionDelay = (index * 0.1) + 's';
    });
  }

  staggerCards();

  /* ---------------------- INTERSECTION OBSERVER (ENHANCED) ---------------------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

})();