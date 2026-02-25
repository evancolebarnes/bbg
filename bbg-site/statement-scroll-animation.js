const setupStatementAnimation = () => {
  const frame = document.querySelector(".statement_track");
  if (!frame) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: frame,
      start: "top top",
      end: "+=250%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  tl.to("[data-identifier='statement-top-sec']", {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    ease: "none",
    duration: 1,
  });
};
