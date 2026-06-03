// ===== MOBILE NAV =====
function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
  });
});

// ===== NAVBAR SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.6)' : 'none';
});

// ===== DEFAULT LOCATION: McKINNEY =====
document.addEventListener('DOMContentLoaded', () => {
  const mckinneyCard = document.querySelector('.location-card[data-location="mckinney"]');
  if (!mckinneyCard) return;
  mckinneyCard.classList.add('active');
  const url = mckinneyCard.dataset.url;
  const location = mckinneyCard.dataset.location;

  document.querySelectorAll('.discipline-card').forEach(dc => {
    const allowed = (dc.dataset.locations || '').split(' ');
    const visible = allowed.includes(location);
    dc.style.display = visible ? '' : 'none';
    if (visible) {
      const btn = dc.querySelector('.btn-secondary');
      if (btn) btn.href = btn.dataset.fixedHref || url;
    }
  });

  const grid = document.querySelector('.disciplines-grid');
  if (grid) grid.classList.remove('disciplines-grid--hidden');

  const prompt = document.querySelector('.location-select-prompt');
  if (prompt) prompt.style.display = 'none';
});

// ===== FILTER CHIPS (visual only) =====
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

// ===== LOCATION PICKER =====
document.querySelectorAll('.location-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.location-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const url = card.dataset.url;
    const location = card.dataset.location;

    const grid = document.querySelector('.disciplines-grid');
    const isFirstReveal = grid && grid.classList.contains('disciplines-grid--hidden');

    if (grid) {
      grid.classList.remove('disciplines-grid--hidden');
      if (isFirstReveal) {
        grid.classList.add('disciplines-grid--animating');
        grid.addEventListener('animationend', () => grid.classList.remove('disciplines-grid--animating'), { once: true });
      }
    }

    let idx = 0;
    document.querySelectorAll('.discipline-card').forEach(dc => {
      const allowed = (dc.dataset.locations || '').split(' ');
      const visible = allowed.includes(location);
      if (visible) {
        dc.style.display = '';
        dc.classList.remove('discipline-card--animate');
        void dc.offsetWidth;
        dc.style.animationDelay = `${idx * 0.07}s`;
        dc.classList.add('discipline-card--animate');
        idx++;
        const btn = dc.querySelector('.btn-secondary');
        if (btn) btn.href = url;
      } else {
        dc.style.display = 'none';
        dc.classList.remove('discipline-card--animate');
        dc.style.animationDelay = '';
      }
    });

    const prompt = document.querySelector('.location-select-prompt');
    if (prompt) prompt.style.display = 'none';
    const step2 = document.getElementById('step2-label');
    if (step2) step2.style.display = '';
    if (grid) {
      const top = grid.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.15);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
