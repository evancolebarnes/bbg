const initLoadingAnimation = (callBack) => {
  const bg = document
    .querySelector(".loading_frame")
    .querySelector(".c-background");

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 0.8 },
  });

  tl.to(".loading_image", { opacity: 1 })

    .to([".loading_image:nth-child(3n+1)", ".loading_image:nth-child(3n+3)"], {
      yPercent: 100,
      y: "4vh",
    })

    .to(
      ".loading_image:nth-child(3n+2)",
      {
        yPercent: -100,
        y: "-4vh",
      },
      "<",
    )

    .set("body", { overflow: "visible" })

    .to(".loading_image:not([data-hero-sec])", {
      opacity: 0,
    })

    .add(() => {
      const hero = document
        .querySelector("[data-hero-sec]")
        .querySelector(".home_hero_image");

      const newParent = document.querySelector(".home_hero_image_wrap");

      const state = Flip.getState(hero);

      newParent.appendChild(hero);

      return Flip.from(state, {
        duration: 1,
        absolute: true,
        scale: true,
        nested: true,
        ease: "power2.inOut",
      });
    })

    .set(bg, { display: "none" })
    .set(".loading_frame", { display: "none" });

  tl.eventCallback("onComplete", () => {
    if (callBack) callBack();
  });
};
