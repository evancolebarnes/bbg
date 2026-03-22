export const setupHorizontalScroll = () => {
  const tl = gsap.timeline({
    ease: "none",
    scrollTrigger: {
      trigger: ".project_track",
      start: "top+=5% top",
      end: "+=700%",
      scrub: true,
      markers: false,
      pin: true,
    },
  });

  tl.to(".project_frame", {
    xPercent: -100,
    x: "calc(-2 * var(--site--gutter))",
    ease: "sine.inOut",
  });
};
