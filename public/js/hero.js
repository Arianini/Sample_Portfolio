// Hero background: an animated scatter plot that continually settles into
// a best-fit regression line — a small, literal nod to what a statistician
// actually does with data.
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const hero = document.getElementById('hero');
    let width, height, dpr;
    let points = [];
    const POINT_COUNT = 46;

    function themeColor(varName, fallback) {
      const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return v || fallback;
    }

    function hexToRgba(hex, alpha) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return `rgba(45,212,191,${alpha})`;
      const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makePoints() {
      points = [];
      // Bias points toward the right/lower half of the canvas so they sit
      // behind the empty space, not directly under the headline.
      for (let i = 0; i < POINT_COUNT; i++) {
        const px = 0.35 + Math.random() * 0.65; // 0..1 across width, biased right
        const trend = 1 - px; // rough downward-left to upper-right correlation
        const py = Math.min(0.92, Math.max(0.08, trend * 0.6 + 0.15 + (Math.random() - 0.5) * 0.35));
        points.push({
          x: px, y: py,
          vx: (Math.random() - 0.5) * 0.00012,
          vy: (Math.random() - 0.5) * 0.00012,
          r: 2 + Math.random() * 2.4,
          delay: Math.random() * 1200,
          born: null
        });
      }
    }

    resize();
    makePoints();
    window.addEventListener('resize', () => { resize(); });

    let start = null;

    function regression() {
      // Simple least-squares fit over current point positions.
      const n = points.length;
      let sx = 0, sy = 0, sxy = 0, sxx = 0;
      points.forEach(p => { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; });
      const denom = (n * sxx - sx * sx) || 1;
      const slope = (n * sxy - sx * sy) / denom;
      const intercept = (sy - slope * sx) / n;
      return { slope, intercept };
    }

    function frame(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;

      ctx.clearRect(0, 0, width, height);

      const teal = themeColor('--teal', '#2dd4bf');
      const blue = themeColor('--blue', '#4c8dff');
      const border = themeColor('--border', 'rgba(45,212,191,0.18)');

      // Drift + fade-in
      points.forEach(p => {
        if (p.born === null && elapsed > p.delay) p.born = elapsed;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0.05 || p.x > 0.98) p.vx *= -1;
        if (p.y < 0.05 || p.y > 0.95) p.vy *= -1;
      });

      // Regression line
      const { slope, intercept } = regression();
      const x1 = 0.02, x2 = 0.98;
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;

      ctx.save();
      ctx.strokeStyle = hexToRgba(blue.startsWith('#') ? blue : '#4c8dff', 0.5);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(x1 * width, y1 * height);
      ctx.lineTo(x2 * width, y2 * height);
      ctx.stroke();
      ctx.restore();

      // Points
      points.forEach(p => {
        if (p.born === null) return;
        const age = elapsed - p.born;
        const scale = Math.min(1, age / 400);
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(teal.startsWith('#') ? teal : '#2dd4bf', 0.85 * scale);
        ctx.arc(p.x * width, p.y * height, p.r * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
})();
