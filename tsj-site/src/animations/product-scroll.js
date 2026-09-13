export default function productScroll() {
  const hands = gsap.utils.toArray(".why_visual_hand");
  const chips = gsap.utils.toArray(".why_chip");

  const directions = [
    { x: -100, y: -100 },
    { x: -100, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: -100 },
    { x: 100, y: 0 },
  ];

  const productElements = [...hands, ".tsj_product_top", ".tsj_product_bottom"];

  const blockElements = [".why_chips_wrap", ...chips];

  const enableWillChange = (elements) =>
    gsap.set(elements, {
      willChange: "transform, opacity",
    });

  const disableWillChange = (elements) =>
    gsap.set(elements, {
      willChange: "auto",
    });

  const tlProduct = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: ".why_track",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,

      onEnter: () => enableWillChange(productElements),
      onEnterBack: () => enableWillChange(productElements),
      onLeave: () => disableWillChange(productElements),
      onLeaveBack: () => disableWillChange(productElements),
    },
  });

  tlProduct
    .fromTo(
      hands,
      {
        opacity: 0,
        xPercent: (i) => directions[i].x,
        yPercent: (i) => directions[i].y,
      },
      {
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        duration: 1,
        stagger: 0.2,
      },
    )
    .to(".tsj_product_top", {
      xPercent: 50,
      yPercent: -50,
      duration: 1,
    })
    .to(
      ".tsj_product_bottom",
      {
        xPercent: -50,
        yPercent: 50,
        duration: 1,
      },
      "<",
    );

  const tlBlocks = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: ".why_blocks_wrap",
      start: "top-=50% center",
      end: "bottom-=10% bottom",
      scrub: 1,

      onEnter: () => enableWillChange(blockElements),
      onEnterBack: () => enableWillChange(blockElements),
      onLeave: () => disableWillChange(blockElements),
      onLeaveBack: () => disableWillChange(blockElements),
    },
  });

  tlBlocks
    .fromTo(
      ".why_chips_wrap",
      { scale: 0 },
      { scale: 1, duration: 1.3, delay: 0.5 },
    )
    .set(".why_chips_wrap", { zIndex: 1 }, "<50%")
    .to(chips, {
      rotation: "+=90",
      stagger: 0.1,
    })
    .to(chips, {
      rotation: "+=90",
      stagger: 0.1,
      delay: 0.1,
    })
    //   .set(".why_chips_wrap", {
    //     zIndex: 0,
    //   })
    .to(".why_chips_wrap", {
      scale: 0,
      duration: 0.35,
      opacity: 0,
      transformOrigin: "50% 100%",
    });
}
