const setupProcessAnimation = () => {
  const processTrack = document.querySelector(".process_track");

  if (!processTrack) return;

  const allImages = processTrack.querySelectorAll(
    ".u-image-wrapper"
  );

  const allParaWrap = document.querySelectorAll(
    ".process_para_wrap"
  );

  gsap.set(allImages, {
    opacity: 0,
  });

  gsap.set(allImages[allImages.length - 1], {
    opacity: 1,
  });

  gsap.set(allParaWrap, {
    height: 0,
    overflow: "hidden",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: processTrack,

      start: "top top",
      end: "bottom bottom",

      scrub: true,

      markers: {
        startColor: "blue",
        endColor: "orange",
        fontSize: "12px",
        indent: 20,
      },

      refreshPriority: 0,
      invalidateOnRefresh: true,
    },
  });

  const imagesReversed = [...allImages].reverse();

  imagesReversed.forEach((image, i) => {
    const currentWrap = allParaWrap[i];

    if (!currentWrap) return;

    const prevWrap = allParaWrap[i - 1];
    const text = currentWrap.querySelector(
      ".process_block_text"
    );

    gsap.set(text, {
      yPercent: 100,
      opacity: 0,
    });

    const step = gsap.timeline();

    step
      .to(image, {
        opacity: 1,
      }, 0)
      .to(currentWrap, {
        height: "auto",
      }, 0);

    if (prevWrap) {
      step.to(
        prevWrap,
        {
          height: 0,
          overflow: "hidden",
        },
        "<"
      );
    }

    tl.add(step);
  });
};
