window.addEventListener("load", () => {
console.log('Github Script')
  gsap.utils.toArray(".home-hero_image-item").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1
        const scale = gsap.utils.interpolate(1, 0.7, p);
        const y = gsap.utils.interpolate(0, -100, p);
        gsap.set(el, { scale, y });
      },
    });
  });
});
