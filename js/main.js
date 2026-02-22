/* ============================================================
   GROOVE AVE — main.js
   - Sticky nav background on scroll
   - Mobile hamburger menu toggle
   - Active nav link highlighting via IntersectionObserver
   - Contact form validation + success message
   ============================================================ */

(function () {
  'use strict';

  /* ── Elements ─────────────────────────────────────────────── */
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const form       = document.getElementById('contact-form');
  const formMsg    = document.getElementById('form-success');
  const allLinks   = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
  const sections   = document.querySelectorAll('section[id]');

  /* ── Sticky nav ───────────────────────────────────────────── */
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── Mobile menu toggle ───────────────────────────────────── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link via IntersectionObserver ─────────────── */
  if (sections.length && allLinks.length) {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          allLinks.forEach(function (link) {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ── Contact form ─────────────────────────────────────────── */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMsg.classList.remove('visible');
      formMsg.textContent = '';

      // Basic validation
      const name    = form.querySelector('#name');
      const email   = form.querySelector('#email');
      const message = form.querySelector('#message');

      const errors = [];
      if (!name.value.trim())    errors.push('Please enter your name.');
      if (!isValidEmail(email.value)) errors.push('Please enter a valid email address.');
      if (!message.value.trim()) errors.push('Please include a message.');

      if (errors.length) {
        formMsg.textContent = errors[0];
        formMsg.style.background = 'rgba(180, 60, 40, 0.12)';
        formMsg.style.borderColor = '#b43c28';
        formMsg.style.color = '#e07060';
        formMsg.classList.add('visible');
        return;
      }

      // Simulate successful send
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formMsg.textContent = "Thanks! We've received your message and will be in touch within 48 hours.";
        formMsg.style.background = '';
        formMsg.style.borderColor = '';
        formMsg.style.color = '';
        formMsg.classList.add('visible');
      }, 800);
    });
  }

  /* ── Helpers ──────────────────────────────────────────────── */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

})();
