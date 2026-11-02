/* ============================================================
   Kernesys Landing — JavaScript principal (Vanilla JS, sin jQuery)
   Depende solo de: Swiper (sliders) y Splitting (animación de texto).
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DESKTOP_MIN = 992;

  /* Textos según el idioma de la página (<html lang="...">).
     Al agregar un texto, agrégalo en los dos idiomas. */
  var STRINGS = {
    es: {
      openMenu: 'Abrir menú de navegación',
      backTop: 'Volver arriba',
      prevSlide: 'Diapositiva anterior',
      nextSlide: 'Diapositiva siguiente',
      needName: 'Escribe tu nombre',
      needEmail: 'Escribe tu correo',
      needSubject: 'Escribe el asunto',
      needMessage: 'Escribe tu mensaje',
      badEmail: 'Escribe un correo válido',
      sending: 'Enviando…',
      sent: '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.',
      failed: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a contacto@kernesys.com.'
    },
    en: {
      openMenu: 'Open navigation menu',
      backTop: 'Back to top',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      needName: 'Please enter your name',
      needEmail: 'Please enter your email',
      needSubject: 'Please enter a subject',
      needMessage: 'Please enter your message',
      badEmail: 'Please enter a valid email',
      sending: 'Sending…',
      sent: 'Thank you! We received your message and will get back to you soon.',
      failed: 'We couldn’t send your message. Please try again or email us at contacto@kernesys.com.'
    }
  };
  var txt = STRINGS[(root.getAttribute('lang') || 'es').slice(0, 2).toLowerCase()] || STRINGS.es;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function headerOffset() {
    var nav = $('#main-nav');
    return nav ? nav.offsetHeight : 0;
  }

  function scrollToY(y) {
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* Hace que un elemento que no es <button> responda a Enter/Espacio. */
  function makeClickable(el, label) {
    if (!el) return;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    if (label) el.setAttribute('aria-label', label);
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  }

  /* ===== Header, menú móvil, scrollspy y volver arriba ===== */
  function initNavigation() {
    var header = $('#page-header');
    var toggler = $('.menu-toggler-btn');
    var menu = $('#navbar-menu-wraper');
    var navList = $('.navbar-nav', menu || doc);
    var backTop = $('#back-to-top');
    var navLinks = $$('.main-navbar .nav-link[href^="#"]');
    var sections = navLinks
      .map(function (link) { return { link: link, target: $(link.getAttribute('href')) }; })
      .filter(function (item) { return item.target; });
    var hasScrolled = false;

    function isMenuOpen() { return menu && menu.classList.contains('show-menu'); }

    function updateHeader() {
      if (!header) return;
      var y = window.scrollY;
      var standOut = window.innerWidth >= DESKTOP_MIN ? y > 50 : (hasScrolled || y > 50);
      header.classList.toggle('header-stand-out', standOut || isMenuOpen());
    }

    function updateActiveLink() {
      var line = window.scrollY + headerOffset() + 2;
      var current = null;
      sections.forEach(function (item) {
        if (item.target.offsetTop <= line) current = item;
      });
      navLinks.forEach(function (link) {
        var active = current && current.link === link;
        link.classList.toggle('active', !!active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function setMenu(open) {
      if (!menu || !toggler) return;
      menu.classList.toggle('show-menu', open);
      toggler.classList.toggle('close-menu-btn', open);
      toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
      updateHeader();
    }

    if (toggler && menu) {
      makeClickable(toggler, txt.openMenu);
      toggler.setAttribute('aria-controls', menu.id);
      toggler.setAttribute('aria-expanded', 'false');
      toggler.addEventListener('click', function () { setMenu(!isMenuOpen()); });
      // Clic en el fondo oscuro del menú móvil lo cierra; clic dentro de la lista no.
      menu.addEventListener('click', function (e) {
        if (!navList || !navList.contains(e.target)) setMenu(false);
      });
      doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen()) setMenu(false);
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = $(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        scrollToY(target.offsetTop - headerOffset() + 1);
        setMenu(false);
      });
    });

    var brand = $('.navbar-brand');
    if (brand) {
      brand.addEventListener('click', function (e) {
        var here = window.location.pathname.replace(/index\.html$/, '');
        if (brand.pathname === here) {
          e.preventDefault();
          scrollToY(0);
        }
      });
    }

    if (backTop) {
      makeClickable(backTop, txt.backTop);
      backTop.addEventListener('click', function () { scrollToY(0); });
    }

    var ticking = false;
    function onScroll() {
      hasScrolled = true;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        if (backTop) backTop.classList.toggle('show', window.scrollY > 50);
        updateHeader();
        updateActiveLink();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    if (backTop) backTop.classList.toggle('show', window.scrollY > 50);
    updateHeader();
    updateActiveLink();
  }

  /* ===== Animaciones al hacer scroll (reemplaza WOW.js) ===== */
  function initRevealAnimations() {
    var items = $$('.wow');
    function reveal(el) {
      el.style.visibility = 'visible';
      var delay = el.getAttribute('data-wow-delay');
      if (delay) el.style.animationDelay = delay;
      el.classList.add('animated');
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.style.visibility = 'visible'; });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ===== Contadores (reemplaza jquery.countTo) =====
     El número final ya está en el HTML (visible para buscadores y lectores
     de pantalla); aquí solo se anima al entrar en pantalla. */
  function initCounters() {
    var counters = $$('.counter[data-to]');
    if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return;

    function animate(el) {
      var from = parseFloat(el.getAttribute('data-from')) || 0;
      var to = parseFloat(el.getAttribute('data-to')) || 0;
      var duration = parseInt(el.getAttribute('data-speed'), 10) || 2000;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(from + (to - from) * progress);
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ===== Sliders (Swiper) ===== */
  function initSliders() {
    if (typeof window.Swiper !== 'function') return;

    var heroEl = $('.hero-swiper-slider .swiper-container');
    if (heroEl) {
      // Sin "loop": Swiper clonaría las diapositivas y duplicaría el <h1>.
      var hero = new window.Swiper(heroEl, {
        speed: 500,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: reduceMotion ? false : { delay: 8000, disableOnInteraction: true }
      });
      var last = function () { return hero.slides.length - 1; };
      var prev = $('.hero-swiper-slider .swiper-button-prev');
      var next = $('.hero-swiper-slider .swiper-button-next');
      function stopAutoplay() { if (hero.autoplay && hero.autoplay.running) hero.autoplay.stop(); }
      if (prev) {
        makeClickable(prev, txt.prevSlide);
        prev.addEventListener('click', function () {
          stopAutoplay();
          if (hero.isBeginning) hero.slideTo(last()); else hero.slidePrev();
        });
      }
      if (next) {
        makeClickable(next, txt.nextSlide);
        next.addEventListener('click', function () {
          stopAutoplay();
          if (hero.isEnd) hero.slideTo(0); else hero.slideNext();
        });
      }
    }

    var clientsEl = $('.our-clients .swiper-container');
    if (clientsEl) {
      new window.Swiper(clientsEl, {
        speed: 600,
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: reduceMotion ? false : { delay: 5000 },
        slidesPerView: 6,
        breakpoints: { 991: { slidesPerView: 3, spaceBetween: 20 } }
      });
    }
  }

  /* ===== Filtros genéricos (Tech Stack y Proyectos) ===== */
  function initFilter(options) {
    var buttons = $$(options.buttons);
    var items = $$(options.items);
    if (!buttons.length || !items.length) return;

    function apply(value, initial) {
      buttons.forEach(function (btn) {
        var active = btn.getAttribute(options.buttonAttr) === value;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      items.forEach(function (item) {
        var show = value === 'all' || options.matches(item, value);
        item.hidden = !show;
        if (show && !initial && !reduceMotion) {
          item.classList.remove('filter-in');
          void item.offsetWidth; // reinicia la animación
          item.classList.add('filter-in');
        }
      });
    }

    buttons.forEach(function (btn) {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function () { apply(btn.getAttribute(options.buttonAttr)); });
    });
    apply('all', true);
  }

  /* ===== Pestañas del stack (Web, Escritorio, Móvil, Analítica) ===== */
  function initStackTabs() {
    var tabs = $$('.stack-tab');
    if (!tabs.length) return;

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.tabIndex = active ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.classList.toggle('is-active', active);
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  }

  /* ===== Formulario de contacto (Web3Forms vía fetch) ===== */
  function initContactForm() {
    var form = $('#contact-us-form');
    if (!form) return;

    var submitBtn = $('#submit-btn', form);
    var statusEl = $('.done-msg', form);
    var inputs = $$('.text-input', form);
    var hideTimer = null;
    var rules = [
      { el: $('#user-name', form), msg: txt.needName },
      { el: $('#user-email', form), msg: txt.needEmail, email: true },
      { el: $('#msg-subject', form), msg: txt.needSubject },
      { el: $('#msg-text', form), msg: txt.needMessage }
    ];

    function syncFilled(input) {
      if (input.parentNode) input.parentNode.classList.toggle('has-text', input.value.trim() !== '');
    }

    function setError(input, message) {
      var holder = input.parentNode && $('.error-msg', input.parentNode);
      if (holder) {
        holder.textContent = message || '';
        holder.style.display = message ? 'block' : 'none';
      }
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }

    function validate() {
      var firstInvalid = null;
      rules.forEach(function (rule) {
        if (!rule.el) return;
        var value = rule.el.value.trim();
        var message = '';
        if (!value) message = rule.msg;
        else if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = txt.badEmail;
        setError(rule.el, message);
        if (message && !firstInvalid) firstInvalid = rule.el;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }

    function showStatus(message, type) {
      if (!statusEl) return;
      window.clearTimeout(hideTimer);
      statusEl.textContent = message;
      statusEl.classList.toggle('is-error', type === 'error');
      statusEl.classList.add('show');
      if (type === 'success') {
        hideTimer = window.setTimeout(function () { statusEl.classList.remove('show'); }, 8000);
      }
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      if (!submitBtn.getAttribute('data-label')) submitBtn.setAttribute('data-label', submitBtn.textContent);
      submitBtn.disabled = loading;
      submitBtn.textContent = loading ? txt.sending : submitBtn.getAttribute('data-label');
      form.setAttribute('aria-busy', loading ? 'true' : 'false');
    }

    inputs.forEach(function (input) {
      syncFilled(input);
      input.addEventListener('input', function () {
        syncFilled(input);
        if (input.getAttribute('aria-invalid')) setError(input, '');
      });
      input.addEventListener('blur', function () { syncFilled(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn && submitBtn.disabled) return;
      if (!validate()) return;

      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });

      setLoading(true);
      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            if (!res.ok || !data.success) throw new Error(data.message || 'Error ' + res.status);
          });
        })
        .then(function () {
          form.reset();
          inputs.forEach(syncFilled);
          showStatus(txt.sent, 'success');
        })
        .catch(function () {
          showStatus(txt.failed, 'error');
        })
        .then(function () { setLoading(false); });
    });
  }

  /* ===== Año dinámico en el footer ===== */
  function initCurrentYear() {
    var year = String(new Date().getFullYear());
    $$('[data-current-year]').forEach(function (el) { el.textContent = year; });
  }

  function init() {
    if (typeof window.Splitting === 'function') window.Splitting();
    initNavigation();
    initSliders();
    initRevealAnimations();
    initCounters();
    initStackTabs();
    initFilter({
      buttons: '#projects-filters .pf-btn',
      buttonAttr: 'data-filter',
      items: '#projects-grid .project-item',
      matches: function (item, value) { return item.classList.contains('cat-' + value); }
    });
    initContactForm();
    initCurrentYear();
    window.__kernesysReady = true;
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

  root.classList.add('js-ready');
})();
