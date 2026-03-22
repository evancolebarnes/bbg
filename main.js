import { setupCreationAnimation } from "./animations/creation";
import { setupFoundationAnimation } from "./animations/foundation";
import { setupHeroAnimation } from "./animations/hero";
import { initLoadingAnimation } from "./animations/loading";
import { setupPortalAnimation } from "./animations/portal";
import { setupProcessAnimation } from "./animations/process";
import { setupHorizontalScroll } from "./animations/project";
import { setProvenProcessAnimation } from "./animations/proven-proecess";

// detect device
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// map all animations
const animationMap = {
  loading: initLoadingAnimation,
  foundation: setupFoundationAnimation,
  process: setupProcessAnimation,
  portal: setupPortalAnimation,
  creation: setupCreationAnimation,
  hero: setupHeroAnimation,
  horizonalScroll: setupHorizontalScroll,
  provenProcess: setProvenProcessAnimation,
};

function runAnimations() {
  const config = window.APP_CONFIG || {};
  const animations = config.animations || [];

  animations.forEach((name) => {
    // skip if not found
    if (!animationMap[name]) return;

    // skip if disabled on mobile
    if (isMobile && config.disableOnMobile?.includes(name)) return;

    animationMap[name]();
  });

  // refresh GSAP after all init
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
}

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    runAnimations();
  });
});
