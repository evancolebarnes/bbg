const initLoadingAnimation = (callBack) => {
  gsap.set(".loading_column", { y: 0 });
  gsap.set("body", {
    height: "100vh",
    overflow: "hidden",
  });

  const mm = gsap.matchMedia();

  // =========================
  // DESKTOP
  // =========================

  mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    tl.to(".loading_image:not([data-logo])", {
      opacity: 1,
    });

    tl.to(
      ".loading_column.is-left, .loading_column.is-right",
      {
        y: 100,
      },
      0,
    );

    tl.to(
      ".loading_column.is-middle",
      {
        y: -100,
      },
      0,
    );

    tl.to(".loading_image:not([data-hero-sec])", {
      opacity: 0,
    });

    tl.to(".loading_image:not([data-hero-sec])", {
      width: 0,
      height: 0,
      marginBottom: 0,
    });

    tl.to(
      "[data-hero-sec]",
      {
        marginBottom: 0,
      },
      "<",
    );

    tl.to(
      ".loading_column.is-left, .loading_column.is-right",
      {
        width: 0,
        padding: 0,
      },
      "<",
    );

    tl.set(".loading_column.is-middle .loading_image:not([data-hero-sec])", {
      display: "none",
    });

    tl.to(".loading_frame", {
      height: "auto",
    });

    tl.to(
      ".loading_column.is-middle",
      {
        y: 0,
      },
      "<",
    );

    tl.set(".loading_column.is-left, .loading_column.is-right", {
      display: "none",
    });

    tl.set("body", {
      height: "auto",
      overflow: "auto",
    });
  });

  // =========================
  // MOBILE
  // =========================

  mm.add("(max-width: 767px)", () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    tl.to(".loading_image:not([data-logo])", {
      opacity: 1,
    });

    tl.to(".loading_column.is-middle", {
      y: -100,
    });

    tl.to(".loading_image:not([data-hero-sec])", {
      opacity: 0,
    });

    tl.to(".loading_image:not([data-hero-sec])", {
      width: 0,
      height: 0,
      marginBottom: 0,
    });

    tl.to(
      "[data-hero-sec]",
      {
        marginBottom: 0,
      },
      "<",
    );

    tl.set(".loading_column.is-middle .loading_image:not([data-hero-sec])", {
      display: "none",
    });

    tl.to(
      ".loading_column.is-middle",
      {
        padding: 0,
        y: 0,
      },
      "<",
    );

    tl.to(".loading_frame", {
      height: "auto",
    });

    tl.set(
      "body",
      {
        height: "auto",
        overflow: "auto",
      },
      "<",
    );
  });
};


/*
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
*/
