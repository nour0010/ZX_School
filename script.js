// ZX School - parallax scroll (نسخة محسّنة للهاتف)
const byClass = (c) => document.getElementsByClassName(c)[0];

const layers = [
  { el: byClass('bgImg2'), speed: 1 },
  { el: byClass('bgImg3'), speed: 1 / 2 },
  { el: byClass('bgImg4'), speed: 1 / 5 },
  { el: byClass('bgImg5'), speed: 1 / 7 },
  { el: byClass('box_of_contant'), speed: 1 },
].filter((l) => l.el); // يتجاهل العناصر الغير موجودة (مثل صفحات ثانية)

const bars = [
  { start: 240, r: byClass('r1'), s: byClass('s1'), h: 29, done: false },
  { start: 368, r: byClass('r2'), s: byClass('s2'), h: 24, done: false },
  { start: 589, r: byClass('r3'), s: byClass('s3'), h: 34, done: false },
].filter((b) => b.r && b.s);

let ticking = false;

function update() {
  ticking = false;
  const y = window.scrollY || window.pageYOffset || 0;

  for (const l of layers) {
    l.el.style.transform = `translate3d(0, ${-y * l.speed}px, 0)`;
  }

  for (const b of bars) {
    if (!b.done && y > b.start) {
      b.done = true; // يتنفذ مرة وحدة بس
      b.r.style.height = `${b.h}vw`;
      b.s.style.height = '10px';
      b.s.style.animation = 'ms1 0.5s ease-in-out 1.5s 1 forwards';
    }
  }
}

// تحديث واحد لكل فريم بدل كل حدث scroll
function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
window.addEventListener('load', update);
window.addEventListener('pageshow', update);
update(); // يرتب المواضع من أول لحظة حتى ما يطلع فراغ
