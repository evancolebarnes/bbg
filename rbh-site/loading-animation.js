const initLoadingAnimation = () => {
  gsap.set(`.home_hero_layout`, {
    yPercent: 100,
  });

  let t = gsap.timeline({
    defaults: {
      ease: `power2.inOut`,
      duration: 0.8,
    },
  });

  t.to(`.loading_image`, {
    opacity: 1,
  })
    .to([`.loading_image:nth-child(3n+1)`, `.loading_image:nth-child(3n+3)`], {
      yPercent: 100,
      y: `4vh`,
    })
    .to(
      `.loading_image:nth-child(3n+2)`,
      {
        yPercent: -100,
        y: `-4vh`,
      },
      `<`,
    )
    .to(`.loading_image:not([data-hero-sec])`, {
      opacity: 0,
    })
    .set(`[data-hero-sec]`, {
      overflow: `visible`,
    })
    .set(`[data-hero-sec] img`, {
      flexShrink: `0`,
    });

  let n = gsap.matchMedia();

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  n.add(`(min-width: 768px)`, () => {
    t.to(
      `[data-hero-sec] img`,
      {
        width: `100vw`,
        maxWidth: `none`,
        height: `100dvh`,
        x: `-8vh`,
      },
      `>`,
    );
  });

  n.add(`(max-width: 767px)`, () => {
    if (isSafari) {
      // Safari workaround
      const offset = window.innerHeight * 0.04;

      t.to(
        `[data-hero-sec] img`,
        {
          width: `100vw`,
          maxWidth: `none`,
          height: `100dvh`,
          x: 0,
          y: `-${offset}px`,
          scaleX: 1.06,
          scaleY: 1.06,
          transformOrigin: `center center`,
        },
        `>`,
      );
    } else {
      // Original Chrome / Android behavior
      t.to(
        `[data-hero-sec] img`,
        {
          width: `100vw`,
          maxWidth: `none`,
          height: `100dvh`,
          x: `-4vh`,
          y: `-4vh`,
        },
        `>`,
      );
    }
  });

  t.set(`.loading_frame`, {
    display: `none`,
  })
    .to(
      `.home_hero_layout`,
      {
        yPercent: 0,
      },
      `<`,
    )
    .to(
      `.home_hero_image_wrap`,
      {
        height: window.innerWidth >= 768 ? `85dvh` : `auto`,
      },
      `<`,
    );

  t.eventCallback(`onComplete`, () => {
    e && e();
  });
};

/*
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
*/

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
