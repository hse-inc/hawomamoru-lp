/* 案件の動き：絵と線の出現（.rv-art・.rv-line）。ページに入ったら is-on、離れたら外す（骨格の swipe.js は直さない） */
(() => {
  const slider = document.getElementById('slider');
  if (!slider) return;
  const STEP = 90;
  const COUNT_MS = 900;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* 数字のカウントアップ：HTML には最終の値を書いておき、ページに入ったら 0 から数え上げる */
  const stopCount = (el) => { cancelAnimationFrame(el.countRaf); el.textContent = el.dataset.count; };
  const countUp = (el) => {
    if (calm) return;
    const goal = Number(el.dataset.count);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      el.textContent = String(Math.round(goal * (1 - (1 - p) ** 3)));
      if (p < 1) el.countRaf = requestAnimationFrame(tick);
    };
    el.textContent = '0';
    el.countRaf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const items = [...en.target.querySelectorAll('.rv-art, .rv-line')];
      const nums = [...en.target.querySelectorAll('[data-count]')];
      if (en.isIntersecting) {
        items.forEach((el, k) => setTimeout(() => el.classList.add('is-on'), 100 + STEP * k));
        nums.forEach(countUp);
      } else {
        items.forEach((el) => el.classList.remove('is-on'));
        nums.forEach(stopCount);
      }
    });
  }, { root: slider, threshold: 0.55 });
  document.querySelectorAll('.page').forEach((p) => io.observe(p));
})();
