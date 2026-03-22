const setupHeroAnimation = () => {
  const visualWrap = document.querySelector(".c_hero_visual_wrap");
  const textWrap = document.querySelector(".c_hero_text_wrap");

  gsap.set(".c_hero_wrap", {
    opacity: 1,
  });

  gsap.set(visualWrap, {
    gridColumnStart: "1",
    borderTopLeftRadius: 0,
    gridRowStart: "1",
  });
  gsap.set(textWrap, { gridRowStart: "1", opacity: 0 });

  const tl = gsap.timeline();

  tl.add(() => {
    // 1) capture BEFORE change
    const state = Flip.getState(visualWrap);

    // 2) apply the layout change
    gsap.set(visualWrap, {
      gridColumnStart: "9",
    });

    // 3) animate from old to new
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
    });
  })
    .to(visualWrap, { borderTopLeftRadius: "var(--radius--one-sided)" })
    .to(textWrap, { opacity: 1, duration: 1.2 });
};
