// ─── Tampilkan hanya proyek yang sesuai ?p=slug ───
(function () {
  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('p');
  const pages   = document.querySelectorAll('.pd-page');
  const notFound = document.getElementById('pdNotFound');

  let found = false;

  pages.forEach(page => {
    if (page.dataset.project === slug) {
      page.classList.add('pd-active');
      // Update <title> sesuai judul proyek
      const titleEl = page.querySelector('.pd-title');
      if (titleEl) {
        document.title = titleEl.textContent + ' — Adani Maulidan';
      }
      found = true;
    }
  });

  // Jika ?p= tidak dikenal, tampilkan pesan 404
  if (!found) {
    if (notFound) notFound.style.display = 'flex';
  }
})();

// ─── Scroll reveal ───
const reveals  = document.querySelectorAll('.reveal');
const revealOb = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealOb.observe(el));

// ─── Mouse-tracked ambient glow ───
document.addEventListener('mousemove', e => {
  const a1 = document.querySelector('.ambient-1');
  const a2 = document.querySelector('.ambient-2');
  const x  = e.clientX / window.innerWidth;
  const y  = e.clientY / window.innerHeight;
  a1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  a2.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
});

// ─── Hamburger menu ───
const hamburger  = document.getElementById('navHamburger');
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

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ─── Lightbox ───
(function () {
  // Buat elemen lightbox sekali
  const lb = document.createElement('div');
  lb.className = 'pd-lightbox';
  lb.innerHTML = `
    <button class="lb-close" id="lbClose" aria-label="Tutup">&times;</button>
    <img id="lbImg" src="" alt="">
    <div class="lb-caption" id="lbCaption"></div>
  `;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('#lbImg');
  const lbCaption = lb.querySelector('#lbCaption');
  const lbClose   = lb.querySelector('#lbClose');

  function openLightbox(src, caption) {
    lbImg.src      = src;
    lbCaption.textContent = caption || '';
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
    // reset src setelah transisi selesai
    setTimeout(() => { lbImg.src = ''; }, 260);
  }

  // Click pada gambar
  document.addEventListener('click', e => {
    const wrap = e.target.closest('[data-lightbox]');
    if (wrap) {
      openLightbox(wrap.dataset.lightbox, wrap.dataset.caption);
      return;
    }
    // Klik di luar gambar / klik backdrop
    if (e.target === lb) closeLightbox();
  });

  lbClose.addEventListener('click', closeLightbox);

  // Tutup dengan Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// ─── SUS Chart Initialization ───
(function() {
  const susCanvas = document.getElementById('susChart');
  if (susCanvas && typeof Chart !== 'undefined') {
    const ctx = susCanvas.getContext('2d');
    
    // Setting up the grouped bar chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Skor Minimum', 'Rata-rata Skor SUS', 'Skor Maksimum'],
        datasets: [
          {
            label: 'Website Lama (99 Responden)',
            data: [7.5, 51.01, 100],
            backgroundColor: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.08)'],
            borderColor: ['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.25)'],
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          },
          {
            label: 'Website Baru (104 Responden)',
            data: [20, 72.57, 100],
            backgroundColor: ['rgba(0, 245, 196, 0.2)', 'rgba(0, 245, 196, 0.5)', 'rgba(0, 245, 196, 0.2)'],
            borderColor: ['rgba(0, 245, 196, 0.6)', 'rgba(0, 245, 196, 1)', 'rgba(0, 245, 196, 0.6)'],
            borderWidth: 1,
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: 'rgba(232, 232, 232, 0.8)',
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              boxWidth: 12,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 15, 0.95)',
            titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
            bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
            padding: 12,
            borderColor: 'rgba(0, 245, 196, 0.2)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: 'rgba(232, 232, 232, 0.5)',
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              stepSize: 20
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: function(context) {
                return context.index === 1 ? 'rgba(255, 255, 255, 1)' : 'rgba(232, 232, 232, 0.7)';
              },
              font: function(context) {
                return {
                  family: "'JetBrains Mono', monospace",
                  size: context.index === 1 ? 13 : 11,
                  weight: context.index === 1 ? 'bold' : 'normal'
                };
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        }
      }
    });
  }
})();
