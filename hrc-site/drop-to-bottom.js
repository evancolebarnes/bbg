const dropToBottomFn = (wrap, target = ".bg_circle") => {
  const sec = document.querySelector(wrap);
  ScrollTrigger.create({
    trigger: sec,
    start: "top 80%", //
    end: "bottom top",
    onEnter: () => {
      const secRect = sec.getBoundingClientRect();
      const circlesArr = gsap.utils.toArray(sec.querySelectorAll(target));
      gsap.to(circlesArr, {
        y: (i, el) => {
          const circleRect = el.getBoundingClientRect();
          return secRect.bottom - circleRect.top - circleRect.height;
        },
        ease: "bounce.out",
        duration: 2,
        stagger: { each: 0.25, from: "end" },
      });
    },
  });
};
