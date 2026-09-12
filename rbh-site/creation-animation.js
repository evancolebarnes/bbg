const setupCreationAnimation = () => {
  const mm = gsap.matchMedia();

  // ==========================================
  // DESKTOP
  // ==========================================
  mm.add("(min-width: 991px)", () => {
    const creationSec = document.querySelector(".creation_track");
    const allCreationBlock = [
      ...document.querySelectorAll(".creation_collection_item"),
    ];

    if (!creationSec || !allCreationBlock.length) return;

    gsap.set(allCreationBlock, {
      autoAlpha: 0,
    });

    gsap.set(allCreationBlock[0], {
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: creationSec,
        start: "top top",
        end: "bottom bottom",

        // NO PIN ON DESKTOP
        pin: false,

        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    const clipBlock = (element) => {
      gsap.set(element, {
        overflow: "hidden",
        willChange: "clip-path",
        webkitClipPath:
          "polygon(0 0, 100% 0, 100% 0, 0 0)",
        clipPath:
          "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });
    };

    allCreationBlock.forEach((block, i, arr) => {
      const primaryImageWrap = block.querySelector(
        ".creation_visual_blocks_wrap"
      );

      const secondaryImage = block.querySelector(
        ".creation_content_image"
      );

      const revealBlocks = block.querySelectorAll(
        ".reveal_block"
      );

      const step = gsap.timeline();

      if (i > 0) {
        const previousTextElements =
          allCreationBlock[i - 1].querySelectorAll(
            "[data-contains-text]"
          );

        step
          .to(
            allCreationBlock[i - 1],
            {
              pointerEvents: "none",
            },
            0
          )
          .set(
            previousTextElements,
            {
              opacity: 0,
            },
            0
          );
      }

      if (i === 0) {
        step
          .fromTo(
            primaryImageWrap,
            { scale: 0 },
            {
              scale: 1,
              duration: 1.2,
            },
            0
          )
          .fromTo(
            secondaryImage,
            { scale: 3 },
            {
              scale: 1,
              duration: 1.2,
            },
            0
          )
          .from(
            revealBlocks,
            {
              x: 0,
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.8,
            },
            0.2
          );
      }

      if (i > 0 && i < arr.length - 1) {
        clipBlock(secondaryImage);

        step
          .set(
            block,
            {
              display: "block",
              autoAlpha: 1,
              pointerEvents: "auto",
            },
            0
          )
          .fromTo(
            primaryImageWrap,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.2,
            },
            0
          )
          .to(
            secondaryImage,
            {
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1.2,
              ease: "none",
            },
            0
          )
          .from(
            revealBlocks,
            {
              x: 0,
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.8,
            },
            0.2
          )
          .set(
            allCreationBlock[i - 1],
            {
              display: "none",
            }
          );

        if (i === arr.length - 2) {
          step.set(
            block.querySelector(".creation_content_block"),
            {
              display: "none",
            }
          );
        }
      }

      if (i === arr.length - 1) {
        const allSecondaryImages =
          document.querySelectorAll(
            ".creation_content_image"
          );

        const allPrimaryImages =
          block.querySelectorAll(
            ".creation_visual_blocks_wrap"
          );

        step
          .set(
            block,
            {
              display: "block",
              autoAlpha: 1,
              pointerEvents: "auto",
            },
            0
          )
          .fromTo(
            allPrimaryImages,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.2,
            },
            0
          )
          .set(
            allSecondaryImages,
            {
              display: "none",
            },
            0
          )
          .from(
            revealBlocks,
            {
              x: 0,
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.8,
            },
            0.2
          );
      }

      tl.add(step);
    });
  });

  // ==========================================
  // MOBILE
  // ==========================================
  mm.add("(max-width: 479px)", () => {
    const creationItems = gsap.utils.toArray(
      ".creation_collection_item"
    );

    if (!creationItems.length) return;

    creationItems.forEach((item, i) => {
      const layout = item.querySelector(
        ".creation_layout"
      );

      if (!layout) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "bottom bottom+=100%",

          scrub: 1,

          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      }).to(layout, {
        xPercent: -100,
        x: () => getComputedStyle(layout).gap,
        ease: "none",
      });
    });
  });
};
