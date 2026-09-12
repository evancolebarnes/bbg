const setupProcessAnimation = () => {
  const processTrack = document.querySelector(".process_track");

  if (!processTrack) return;

  const allImages = processTrack.querySelectorAll(
    ".u-image-wrapper"
  );

  const allParaWrap = document.querySelectorAll(
    ".process_para_wrap"
  );

  if (!allImages.length || !allParaWrap.length) return;

  // ------------------------------------------
  // Initial states
  // ------------------------------------------
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

  // ------------------------------------------
  // Process ScrollTrigger
  // ------------------------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: processTrack,

      start: "top top",
      end: "bottom bottom",

      scrub: true,
      markers: false,

      // Creation pins calculate before Process
      refreshPriority: 0,

      invalidateOnRefresh: true,
    },
  });

  const imagesReversed = [...allImages].reverse();

  // ------------------------------------------
  // Process steps
  // ------------------------------------------
  imagesReversed.forEach((image, i) => {
    const currentWrap = allParaWrap[i];

    if (!currentWrap) return;

    const prevWrap = allParaWrap[i - 1];

    const text = currentWrap.querySelector(
      ".process_block_text"
    );

    if (text) {
      gsap.set(text, {
        yPercent: 100,
        opacity: 0,
      });
    }

    const step = gsap.timeline();

    step.to(
      image,
      {
        opacity: 1,
      },
      0
    );

    step.to(
      currentWrap,
      {
        height: "auto",
      },
      0
    );

    // Only animate previous wrapper
    // if one actually exists
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

    if (text) {
      step.to(
        text,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    }

    tl.add(step);
  });
};
