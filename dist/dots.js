(() => {
  const canvas = document.querySelector('.dot-background');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const spacing = 24;
  let width = 0, height = 0, points = [], frame = 0, lastDraw = -Infinity;
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  function resize() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.background = 'none';
    points = [];
    for (let y = 12, row = 0; y < height; y += spacing, row++) {
      for (let x = 12, col = 0; x < width; x += spacing, col++) {
        const seed = row * 173 + col * 31;
        points.push({x, y, seed, phase: hash(seed + 9) * 15, period: 9 + hash(seed + 4) * 8});
      }
    }
    draw(performance.now() / 1000);
  }
  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    for (const p of points) {
      // Uneven phases illuminate different grid points each cycle, without flicker.
      const t = (time + p.phase) / p.period;
      const cycle = Math.floor(t), phase = t - cycle;
      const active = !reduced.matches && hash(p.seed + cycle * 719) > .9;
      const pulse = active && phase < .6 ? Math.pow(Math.sin(Math.PI * phase / .6), 2) : 0;
      const fade = .15 + .28 * Math.pow(p.y / height, 1.2);
      const alpha = Math.min(1, fade + pulse * .65);
      ctx.fillStyle = pulse > .025 ? `rgba(64,205,116,${alpha})` : `rgba(185,202,194,${fade})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, .75 + pulse * .12, 0, Math.PI * 2); ctx.fill();
    }
  }
  function animate(now) {
    if (now - lastDraw >= 50) { draw(now / 1000); lastDraw = now; }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    draw(performance.now() / 1000);
    if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(animate);
  }
  addEventListener('resize', resize, {passive:true});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  resize(); sync();
})();
