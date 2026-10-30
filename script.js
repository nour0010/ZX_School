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

// ===== تثبيت طول الصفحة =====
// الطبقات تتحرك للأعلى بسرعة ضعف التمرير، فلازم الصفحة تنتهي بالضبط لما
// يصير المستطيل ملتصق بآخر الشاشة. نحسب المسافة مرة وحدة ونثبّتها (بدل ما تتغير مع الحركة).
const boxEl = byClass('box_of_contant');
const boxSpeed = 1;
let lastW = -1;

function fixPageHeight() {
  if (!boxEl) return;
  const vh = document.documentElement.clientHeight;
  const body = document.body;
  const container = byClass('container');

  const prevT = boxEl.style.transform;
  boxEl.style.transform = 'none';
  const bottom = boxEl.getBoundingClientRect().bottom + (window.scrollY || 0);
  boxEl.style.transform = prevT;

  // المستطيل يتحرك y*(speed) إضافي، فمدى التمرير = (طول المحتوى - الشاشة) / (1 + speed)
  const range = Math.max(0, (bottom - vh) / (1 + boxSpeed));
  body.style.height = Math.round(range + vh) + 'px';
  // html لازم يكون عنده overflow حتى ما ينتقل قص body لكل الصفحة ويوقف التمرير
  document.documentElement.style.overflowY = 'auto';
  body.style.overflow = 'clip';
  body.style.alignItems = 'flex-start';
  if (container) {
    container.style.height = Math.round(vh * 0.97) + 'px';
    container.style.marginTop = Math.round(vh * 0.015) + 'px';
  }
}

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
window.addEventListener('resize', () => {
  // نعيد الحساب فقط إذا تغير العرض (حتى ما يتأثر بشريط المتصفح بالهاتف)
  if (window.innerWidth !== lastW) {
    lastW = window.innerWidth;
    fixPageHeight();
  }
  requestUpdate();
});
window.addEventListener('load', () => { lastW = window.innerWidth; fixPageHeight(); update(); });
window.addEventListener('pageshow', update);
lastW = window.innerWidth;
fixPageHeight();
// إذا تغير طول المستطيل (مثلاً بعد تحميل صور متأخرة) نعيد حساب طول الصفحة
if (boxEl && window.ResizeObserver) {
  let pending = false;
  new ResizeObserver(() => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; fixPageHeight(); update(); });
  }).observe(boxEl);
}
update(); // يرتب المواضع من أول لحظة حتى ما يطلع فراغ
