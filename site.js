/* 案件の動き：絵と線の出現（.rv-art・.rv-line）。ページに入ったら is-on、離れたら外す（骨格の swipe.js は直さない） */
(() => {
  const slider = document.getElementById('slider');
  if (!slider) return;
  const STEP = 90;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const items = [...en.target.querySelectorAll('.rv-art, .rv-line')];
      if (en.isIntersecting) items.forEach((el, k) => setTimeout(() => el.classList.add('is-on'), 100 + STEP * k));
      else items.forEach((el) => el.classList.remove('is-on'));
    });
  }, { root: slider, threshold: 0.55 });
  document.querySelectorAll('.page').forEach((p) => io.observe(p));
})();
