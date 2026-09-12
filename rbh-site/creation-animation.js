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
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    // ------------------------------------------
    // Clip block
    // ------------------------------------------
    const clipBlock = (element) => {
      if (!element) return;

      gsap.set(element, {
        overflow: "hidden",
        willChange: "clip-path",
      });

      gsap.set(element, {
        webkitClipPath:
          "polygon(0 0, 100% 0, 100% 0, 0 0)",
        clipPath:
          "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });
    };

    // ------------------------------------------
    // Creation blocks
    // ------------------------------------------
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

      if (!primaryImageWrap) return;

      const step = gsap.timeline();

      // ----------------------------------------
      // Hide previous block
      // ----------------------------------------
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

      // ----------------------------------------
      // First block
      // ----------------------------------------
      if (i === 0) {
        step
          .fromTo(
            primaryImageWrap,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 1.2,
            },
            0
          )
          .fromTo(
            secondaryImage,
            {
              scale: 3,
            },
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

      // ----------------------------------------
      // Middle blocks
      // ----------------------------------------
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
            {
              opacity: 0,
            },
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
            block.querySelector(
              ".creation_content_block"
            ),
            {
              display: "none",
            }
          );
        }
      }

      // ----------------------------------------
      // Last block
      // ----------------------------------------
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
            {
              opacity: 0,
            },
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
  // MOBILE / TABLET
  // ==========================================
  mm.add("(max-width: 990px)", () => {
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

          // -------------------------------
          // MOBILE PIN
          // -------------------------------
          pin: true,
          pinSpacing: true,

          start: "top top",
          end: "+=100%",

          scrub: 1,

          // -------------------------------
          // MOBILE DEBUG MARKERS
          // -------------------------------
          markers: {
            startColor: "green",
            endColor: "red",
            fontSize: "12px",
            indent: 20 + i * 10,
          },

          // -------------------------------
          // Refresh order
          // -------------------------------
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      }).to(layout, {
        xPercent: -100,

        x: () => {
          return getComputedStyle(layout).gap;
        },

        ease: "none",
      });
    });
  });

  return mm;
};


// ==========================================
// PROCESS ANIMATION
// ==========================================
const setupProcessAnimation = () => {
  const processTrack = document.querySelector(
    ".process_track"
  );

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

      // -------------------------------
      // PROCESS DEBUG MARKERS
      // -------------------------------
      markers: {
        startColor: "blue",
        endColor: "orange",
        fontSize: "12px",
        indent: 20,
      },

      // Process calculates after Creation
      refreshPriority: 0,
      invalidateOnRefresh: true,
    },
  });

  // ------------------------------------------
  // Reverse images
  // ------------------------------------------
  const imagesReversed = [...allImages].reverse();

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

    // Image
    step.to(
      image,
      {
        opacity: 1,
      },
      0
    );

    // Current text wrapper
    step.to(
      currentWrap,
      {
        height: "auto",
      },
      0
    );

    // Previous text wrapper
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

    // Text reveal
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


// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    initLoadingAnimation();

    setupFoundationAnimation();

    setupCreationAnimation();

    setupProcessAnimation();

    // Initial refresh
    ScrollTrigger.refresh();

    bbG_Utility.SliderHeightUtility(
      testimonialSliderUtility
    );
  });
});


// ==========================================
// FINAL REFRESH AFTER PAGE LOAD
// ==========================================
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
