const setupProcessAnimation = () => {
  const allImages = document
    .querySelector(".process_track")
    .querySelectorAll(".u-image-wrapper");
  const allParaWrap = document.querySelectorAll(".process_para_wrap");
  gsap.set(allImages, { opacity: 0 });
  gsap.set(allImages[allImages.length - 1], { opacity: 1 });

  gsap.set(allParaWrap, { height: 0, overflow: "hidden" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".process_track",
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: true,
      markers: false,
      anticipatePin: 1,
    },
  });
  const imagesReversed = [...allImages].reverse();

  imagesReversed.forEach((image, i) => {
    const currentWrap = allParaWrap[i];
    const prevWrap = allParaWrap[i - 1];
    const text = currentWrap.querySelector(".process_block_text");

    gsap.set(text, { yPercent: 100, opacity: 0 });

    const step = gsap.timeline({
      onComplete: () => {
        gsap.to(text, {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    step
      .to(image, { opacity: 1 }, 0)
      .to(currentWrap, {
        height: "auto",
      })
      .to(
        prevWrap || {},
        {
          height: 0,
          overflow: "hidden",
        },
        "<",
      );

    tl.add(step);
  });
};
