const dropToBottomFn = (wrap, target = ".bg_circle") => {
  const wrapper = document.querySelector(wrap);
  const circlesArr = gsap.utils.toArray(wrapper.querySelectorAll(target));
  ScrollTrigger.create({
    trigger: wrapper,
    start: "top 80%", //
    end: "bottom top",
    onEnter: () => {
      gsap.to(circlesArr, {
        bottom: 0,
        ease: "bounce.out",
        duration: 2,
        stagger: { each: 0.25, from: "end" },
      });
    },
  });
};
