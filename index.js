// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Stagger project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

// Mouse-tracked ambient glow
document.addEventListener('mousemove', (e) => {
  const a1 = document.querySelector('.ambient-1');
  const a2 = document.querySelector('.ambient-2');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  a1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  a2.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
});

// Hamburger menu toggle
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');
const mobileLinks = document.querySelectorAll('.nav-mobile-link');

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ── CERT LIGHTBOX ──
const certLightbox   = document.getElementById('certLightbox');
const certLbImg      = document.getElementById('certLightboxImg');
const certLbCaption  = document.getElementById('certLightboxCaption');
const certLbClose    = document.getElementById('certLightboxClose');
const certLbBackdrop = document.getElementById('certLightboxBackdrop');

function openCertLightbox(src, caption) {
  certLbImg.src = src;
  certLbCaption.textContent = caption;
  certLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertLightbox() {
  certLightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { certLbImg.src = ''; }, 300);
}

// Open on clicking any cert-img-wrap
document.querySelectorAll('.cert-img-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    const img     = wrap.querySelector('.cert-img');
    const caption = wrap.closest('.cert-card').querySelector('.cert-name').textContent;
    openCertLightbox(img.src, caption);
  });
});

// Close via backdrop, close button, or Escape key
certLbBackdrop.addEventListener('click', closeCertLightbox);
certLbClose.addEventListener('click', closeCertLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertLightbox();
});
