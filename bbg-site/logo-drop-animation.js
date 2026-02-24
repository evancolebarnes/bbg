const setupLogoDropAnimation = () -> {
 SplitText.create("[data-anim='Gravity Text']", {
  type: "lines, words, chars",
  autoSplit: true,
  onSplit(self) {
    const chars = self.chars;

    chars.forEach((char) => {

      const rect = char.getBoundingClientRect();

      // distance from top of viewport
      const dropStart = rect.top;

      gsap.set(char, {
        y: -dropStart,
        rotate: gsap.utils.random(-30, 30),
        autoAlpha: 0
      });

    });

    return gsap.to(chars, {
      y: 0,          
      autoAlpha: 1,
      rotate: () => gsap.utils.random(-10, 10),
      duration: () => gsap.utils.random(1.2, 1.8),
      ease: "bounce.out",          
      stagger: { each: () => gsap.utils.random(0.1, 0.5), from: "start" }
    });
  }
});
}
