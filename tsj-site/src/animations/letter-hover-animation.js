export default function hoverLetterAnimation() {
  document.querySelectorAll("[data-hover-trigger]").forEach((trigger) => {
    const text = trigger.querySelector('[data-anim="letters-slide-in"]');
    if (!text) return;

    const split = SplitText.create(text, {
      type: "chars",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(split.chars, {
      yPercent: -100,
      stagger: 0.015,
      duration: 0.15,
      ease: "power2.out",
    })
      .set(split.chars, {
        yPercent: 100,
      })
      .to(split.chars, {
        yPercent: 0,
        stagger: 0.015,
        duration: 0.15,
        ease: "power2.out",
      });

    trigger.addEventListener("mouseenter", () => {
      tl.restart();
    });
  });
}
