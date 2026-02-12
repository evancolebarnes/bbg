const setupFoundationAnimation = () => {
  
  const track = document.querySelector('.foundation_track');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: "top top",
      end: () => {
        const isMobile = window.innerWidth <= 767
        return isMobile ? `bottom+=${window.innerHeight} bottom` : 'bottom bottom';
      },
      scrub: true,
      pin: true,
      markers: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.from("[data-anim-custom = reveal-from-below]", {
    y: 60,
    opacity: 0,
    stagger: 0.5,
    duration: 2,
  })
    .from(
      "[data-anim-custom = reveal-from-above]",
      { y: -60, opacity: 0, duration: 2, stagger: 0.5 },
      "<1",
    )
    .to("[data-section-identifier=foundation-top]", {
      clipPath: "polygon(0 0,0 100%,0% 100%,0% 0)",
      duration: 2,
    });
};
