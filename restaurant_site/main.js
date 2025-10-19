// js/main.js — Navigation, accessibility, small UI helpers
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // Smooth anchor scrolling (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile nav if open
          if (navList.classList.contains('show')) navList.classList.remove('show');
        }
      }
    });
  });

  // Shrink header on scroll
  const header = document.getElementById('main-header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if (sc > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastScroll = sc;
  }, {passive:true});

  // IntersectionObserver for reveal animations
  const revealItems = document.querySelectorAll('.gallery-item, .staff-card, .menu-card, .review, .section h2, .highlight-bar');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach(el => io.observe(el));
});
