const setupFoundationAnimation = () => {
  const track = document.querySelector(".foundation_track");

  const revealBelow = "[data-anim-custom='reveal-from-below']";
  const revealAbove = "[data-anim-custom='reveal-from-above']";

  // Set initial state before the animation starts
  gsap.set([revealBelow, revealAbove], {
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    revealBelow,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 2,
    },
  )
    .fromTo(
      revealAbove,
      {
        y: -60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 2,
      },
      "<1",
    )
    .to("[data-section-identifier='foundation-top']", {
      clipPath: "polygon(0 0, 0 100%, 0% 100%, 0% 0)",
      duration: 2,
    });
};
