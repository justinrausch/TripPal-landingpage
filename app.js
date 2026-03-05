/* ─────────────────────────────────────────────────────────────────────────────
   ROAMY LANDING PAGE — app.js
───────────────────────────────────────────────────────────────────────────── */

'use strict';

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Navbar scroll shadow ──────────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(60,40,20,.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = y;
}, { passive: true });

// ── Subtle hero parallax ──────────────────────────────────────────────────────
const heroMockup = document.querySelector('.hero-mockup');
const blobs = document.querySelectorAll('.blob');

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroMockup) {
      heroMockup.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
    blobs.forEach((blob, i) => {
      const speed = 0.04 + i * 0.02;
      blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}

// ── Smooth anchor scroll ──────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
