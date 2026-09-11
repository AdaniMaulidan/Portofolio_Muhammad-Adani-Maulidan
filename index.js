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
