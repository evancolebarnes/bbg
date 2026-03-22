export const initLoadingAnimation = (callBack) => {
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

    .to(".loading_frame", {
      opacity: 0,
    })

    .set(".loading_frame", { display: "none" });

  tl.eventCallback("onComplete", () => {
    if (callBack) callBack();
  });
};
