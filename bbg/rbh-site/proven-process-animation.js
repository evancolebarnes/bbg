const setProvenProcessAnimation = () => {
  const initProcessAnimation = (tab) => {
    const allStepBlocks = tab.querySelectorAll(".step_block");
    const allImages = tab.querySelectorAll(".u-image-wrapper");
    const tabContent = tab.querySelector(".proven_process_content");
    const isMobile = bbG_Utility.isMobile;

    if (!tabContent) return;

    // reset states
    gsap.set(tab.querySelectorAll(".step_para"), {
      height: 0,
      opacity: 0,
      overflow: "hidden",
      yPercent: 100,
    });

    gsap.set(allImages, { opacity: 0 });
    gsap.set(allStepBlocks, { opacity: 0.4 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: tabContent,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    allImages.forEach((image, i) => {
      const currentWrap = allStepBlocks[i];
      const prevWrap = allStepBlocks[i - 1];

      const text = currentWrap.querySelector(".step_para");
      const prevText = prevWrap?.querySelector(".step_para");

      tl.to(image, { opacity: 1 }, i)
        .to(currentWrap, { opacity: 1 }, "<")
        .to(text, { yPercent: 0, height: "auto", opacity: 1 }, "<")
        .to(prevWrap || {}, { opacity: 0.4 }, "<")
        .to(prevText || {}, { height: 0, opacity: 0, yPercent: 100 }, "<");
    });
  };

  const runTabsAnimation = () => {
    const activeTab = document.querySelector(".w--tab-active");
    if (!activeTab) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    initProcessAnimation(activeTab);

    ScrollTrigger.refresh();
  };

  // observe tab changes
  const tabContainer = document.querySelector(".w-tab-content");

  const observer = new MutationObserver(() => {
    runTabsAnimation();
  });

  observer.observe(tabContainer, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  });

  // initial run
  runTabsAnimation();
};
