// Navbar background on scroll
const nav = document.querySelector('.navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// About page tabs
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });

  // Typewriter effect for the hero caption
  const caption = document.getElementById('tagline');
  if (caption) {
    const text = caption.dataset.tagline || '';
    let i = 0;
    let deleting = false;

    function type() {
      caption.textContent = text.substring(0, i);
      if (!deleting && i < text.length) {
        i++;
        setTimeout(type, 55);
      } else if (!deleting && i === text.length) {
        deleting = true;
        setTimeout(type, 2200);
      } else if (deleting && i > 0) {
        i--;
        setTimeout(type, 30);
      } else {
        deleting = false;
        setTimeout(type, 500);
      }
    }
    if (text) type();
  }
});
