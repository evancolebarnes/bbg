const dropToBottomFn = (wrap, target = ".bg_circle") => {
  const sec = document.querySelector(wrap);
  const circlesArr = gsap.utils.toArray(sec.querySelectorAll(target));
  const secRect = sec.getBoundingClientRect();

  ScrollTrigger.create({
    trigger: sec,
    start: "top 80%", // when section enters viewport
    end: "bottom top", // when section leaves
    onEnter: () => {
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
