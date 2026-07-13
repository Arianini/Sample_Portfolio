(() => {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const saved = localStorage.getItem('theme');
  root.setAttribute('data-theme', saved === 'light' ? 'light' : 'dark');
  if (!saved) localStorage.setItem('theme', 'dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
})();
