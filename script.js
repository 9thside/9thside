/* ═══════════════════════════════════════════════════════════════
   9thSide — Script
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL BEHAVIOUR ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── HAMBURGER / MOBILE MENU ───────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileLinks.forEach(l => l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── HERO VIDEO — mute enforcement (browser policy) ───────── */
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.muted = true;
    // Some browsers need a user gesture; ensure muted + playsinline
    heroVideo.play().catch(() => {
      // Autoplay blocked — video stays as poster/first-frame, overlay still shows
    });
  }

  /* ── SMOOTH SCROLL (anchor links) ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── STATS COUNTER ─────────────────────────────────────────── */
  const statsSection = document.querySelector('.stats');
  let statsDone = false;

  function animateCount(el, target, duration = 1800) {
    let start = null;
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    function step(ts) {
      if (!start) start = ts;
      const elapsed  = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(ease(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsDone) {
      statsDone = true;
      document.querySelectorAll('.stats__number').forEach(el => {
        animateCount(el, parseInt(el.dataset.target));
      });
    }
  }, { threshold: 0.5 });

  if (statsSection) statsObserver.observe(statsSection);

  /* ── SERVICES CAROUSEL (mobile) ────────────────────────────── */
  const track       = document.getElementById('servicesTrack');
  const prevBtn     = document.getElementById('servicesPrev');
  const nextBtn     = document.getElementById('servicesNext');
  const sdots       = document.querySelectorAll('.services__dot');
  let sIndex        = 0;
  let perView       = getPerView();

  function getPerView() {
    if (window.innerWidth < 768)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  function updateServicesCarousel() {
    perView = getPerView();
    const maxIndex  = 4 - perView;
    sIndex = Math.min(sIndex, maxIndex);
    const pct  = 100 / perView;
    const gap  = 24;
    track.style.transform = `translateX(calc(-${sIndex * pct}% - ${sIndex * gap / perView}px))`;
    sdots.forEach((d, i) => d.classList.toggle('active', i === sIndex));
  }

  prevBtn.addEventListener('click', () => {
    if (sIndex > 0) { sIndex--; updateServicesCarousel(); }
  });
  nextBtn.addEventListener('click', () => {
    if (sIndex < 4 - getPerView()) { sIndex++; updateServicesCarousel(); }
  });
  sdots.forEach(d => {
    d.addEventListener('click', () => {
      sIndex = parseInt(d.dataset.index);
      updateServicesCarousel();
    });
  });

  window.addEventListener('resize', updateServicesCarousel);

  /* ── WORK FILTER ───────────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.work__filter');
  const workItems  = document.querySelectorAll('.work__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      workItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        if (show) {
          item.classList.remove('hidden');
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => item.classList.add('hidden'), 350);
        }
      });
    });
  });

  /* ── TESTIMONIALS SLIDER ───────────────────────────────────── */
  const tTrack  = document.getElementById('testimonialsTrack');
  const tPrev   = document.getElementById('testimonialsPrev');
  const tNext   = document.getElementById('testimonialsNext');
  let tIndex    = 0;

  function getTestimonialsPerView() {
    if (window.innerWidth < 768)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  function updateTestimonials() {
    const pv      = getTestimonialsPerView();
    const maxIdx  = 4 - pv;
    tIndex = Math.max(0, Math.min(tIndex, maxIdx));
    const pct = 100 / pv;
    tTrack.style.transform = `translateX(-${tIndex * pct}%)`;
  }

  tPrev.addEventListener('click', () => { tIndex--; updateTestimonials(); });
  tNext.addEventListener('click', () => { tIndex++; updateTestimonials(); });
  window.addEventListener('resize', updateTestimonials);

  /* ── FAQ ACCORDION ─────────────────────────────────────────── */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── CONTACT FORM ──────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.transition = 'opacity 0.4s';
      form.style.opacity = '0';
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.classList.add('visible');
      }, 400);
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────────── */
  function addRevealClasses() {
    const selectors = [
      '.stats__item',
      '.service-card',
      '.work__item',
      '.process__step',
      '.testimonial-card',
      '.faq__item',
      '.section-header',
      '.about__text',
      '.about__visual',
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        const delayClass = `reveal-delay-${Math.min(i % 4 + 1, 4)}`;
        el.classList.add(delayClass);
      });
    });
  }

  addRevealClasses();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── HERO PARALLAX ─────────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const heroContent = document.querySelector('.hero__content');
    if (heroContent && y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.3}px)`;
      heroContent.style.opacity   = `${1 - y / (window.innerHeight * 0.65)}`;
    }
  }, { passive: true });

  /* ── NAV ACTIVE STATE ──────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function highlightNav() {
    const scrollY = window.scrollY + navbar.offsetHeight + 80;
    let active = '';
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) active = s.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('nav__link--active', href === active);
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

})();
