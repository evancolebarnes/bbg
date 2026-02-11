const setupPortalAnimation = () => {
  const ctaVisualWrap = document.querySelector(".statement_cta_visual");
  const imagesArr = ctaVisualWrap.querySelectorAll(".u-image-wrapper");
  const statementCtaContentWrap = document.querySelector(
    ".statement_cta_content_wrap",
  );

  gsap.set(ctaVisualWrap, {
    gridColumnStart: "full",
    borderTopLeftRadius: 0,
    gridRowStart: "1",
  });
  gsap.set(statementCtaContentWrap, { gridRowStart: "1", opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".statement_cta_wrap",
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      markers: false,
    },
  });

  tl.from(imagesArr, { scale: 0, duaration: 1.2, stagger: { each: 0.35 } })
    .add(() => {
      // 1) capture BEFORE change
      const state = Flip.getState(ctaVisualWrap);

      // 2) apply the layout change
      gsap.set(ctaVisualWrap, {
        gridColumnStart: "9",
      });

      // 3) animate from old to new
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
      });
    })
    .to(ctaVisualWrap, { borderTopLeftRadius: "var(--radius--one-sided)" })
    .to(statementCtaContentWrap, { opacity: 1, duration: 1.2 });
};
