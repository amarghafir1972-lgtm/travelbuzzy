/* TravelBuzzy - scripts.js
   Minimal JS: sticky header shadow, smooth scroll, mobile nav toggle
   No dependencies. WordPress/Elementor compatible. */

(function () {
  'use strict';

  // ─── Sticky Header Shadow ─────────────────────────────────────────────────
  var header = document.querySelector('.tb-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('tb-header--scrolled');
      } else {
        header.classList.remove('tb-header--scrolled');
      }
    }, { passive: true });
  }

  // ─── Smooth Scroll for Anchor Links ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─── Mobile Nav Toggle ────────────────────────────────────────────────────
  var menuToggle = document.querySelector('.tb-mobile-toggle');
  var mobileMenu = document.querySelector('.tb-mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('tb-mobile-menu--open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ─── Newsletter Form (demo) ───────────────────────────────────────────────
  var form = document.querySelector('.tb-newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        form.innerHTML = '<p class="tb-newsletter-success">You\'re on the list. Check your inbox!</p>';
      }
    });
  }

})();
