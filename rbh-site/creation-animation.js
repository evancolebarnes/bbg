const setupCreationAnimation = () => {
  const creationSec = document.querySelector(".creation_sec");
  const allCreationBlock = [
    ...document.querySelectorAll(".creation_collection_item"),
  ];

  gsap.set(allCreationBlock, { autoAlpha: 0 });
  gsap.set(allCreationBlock[0], { autoAlpha: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: creationSec,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: true,
      markers: false,
      anticipatePin: 1,
    },
  });

  const hideElements = (block) => {
    const textBlocks = [...block.querySelectorAll("[data-contains-text]")];

    textBlocks.forEach((txtBlock) => gsap.set(txtBlock, { opacity: 0 }));
  };

  const clipBlock = (element) => {
    gsap.set(element, { overflow: "hidden", willChange: "clip-path" });

    gsap.set(element, {
      webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    });
  };

  allCreationBlock.forEach((block, i, arr) => {
    const primaryImageWrap = block.querySelector(
      ".creation_visual_blocks_wrap",
    );
    const primaryImage = primaryImageWrap.querySelector(".u-image-wrapper");
    const secondaryImage = block.querySelector(".creation_content_image");
    const revealBlocks = block.querySelectorAll(".reveal_block");
    console.log(arr.length);

    const step = gsap.timeline();

    if (i > 0) {
      const prevoiusTextElements = allCreationBlock[i - 1].querySelectorAll([
        "[data-contains-text]",
      ]);
      console.log(allCreationBlock[i - 1]);
      step
        .to(allCreationBlock[i - 1], { pointerEvents: "none" }, 0)
        .set(prevoiusTextElements, { opacity: 0 }, 0);
    }

    if (i === 0) {
      step
        .fromTo(primaryImageWrap, { scale: 0 }, { scale: 1, duration: 1.2 }, 0)
        .fromTo(secondaryImage, { scale: 3 }, { scale: 1, duration: 1.2 }, 0)
        .from(
          revealBlocks,
          { x: 0, y: 0, opacity: 1, stagger: 0.06, duration: 0.8 },
          0.2,
        );
    }
    if (i > 0 && i < arr.length - 1) {
      clipBlock(secondaryImage);
      step
        .set(
          block,
          { display: "block", autoAlpha: 1, pointerEvents: "auto" },
          0,
        )
        .fromTo(
          primaryImageWrap,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.2,
          },
          0,
        )
        .to(
          secondaryImage,
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "none",
          },
          0,
        )
        .from(
          revealBlocks,
          { x: 0, y: 0, opacity: 1, stagger: 0.06, duration: 0.8 },
          0.2,
        )
        .set(allCreationBlock[i - 1], { display: "none" });
      if (i === arr.length - 2) {
        step.set(block.querySelector(".creation_content_block"), {
          display: "none",
        });
      }
    }
    if (i === arr.length - 1) {
      const allSecondatyImages = document.querySelectorAll(
        ".creation_content_image",
      );
      const allPrimaryImages = block.querySelectorAll(
        ".creation_visual_blocks_wrap",
      );

      step
        .set(
          block,
          { display: "block", autoAlpha: 1, pointerEvents: "auto" },
          0,
        )
        .fromTo(
          allPrimaryImages,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.2,
          },
          0,
        )
        .set(
          allSecondatyImages,
          {
            display: "none",
          },
          0,
        )
        .from(
          revealBlocks,
          { x: 0, y: 0, opacity: 1, stagger: 0.06, duration: 0.8 },
          0.2,
        );
    }

    tl.add(step);
  });
};
