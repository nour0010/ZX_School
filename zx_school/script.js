// Parallax الصفحة الرئيسية + شريط التأثير
// تحديث واحد لكل فريم (requestAnimationFrame) + مستمع passive، بدون console.log
(function () {
  const $ = (c) => document.getElementsByClassName(c)[0];

  const layers = [
    [$("bgImg2"), 1],
    [$("bgImg3"), 2],
    [$("bgImg4"), 5],
    [$("bgImg5"), 7],
    [$("box_of_contant"), 1],
  ].filter((l) => l[0]);

  const bars = [
    { start: 240, r: $("r1"), s: $("s1"), h: 29 },
    { start: 368, r: $("r2"), s: $("s2"), h: 24 },
    { start: 589, r: $("r3"), s: $("s3"), h: 34 },
  ].filter((b) => b.r && b.s);

  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;

    for (const [el, d] of layers) {
      el.style.transform = `translate3d(0, ${-(y / d)}px, 0)`;
    }

    for (const b of bars) {
      if (!b.done && y > b.start) {
        b.done = true; // مرة وحدة فقط بدل كل حركة سكرول
        b.r.style.height = `${b.h}vw`;
        b.s.style.height = "10px";
        b.s.style.animation = "ms1 0.5s ease-in-out 1.5s 1 forwards";
      }
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
})();
