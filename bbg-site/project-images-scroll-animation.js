window.addEventListener("load", () => {
  gsap.utils.toArray(".animated-project_media-item").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const scale = gsap.utils.interpolate(1, 0.7, p);
        const y = gsap.utils.interpolate(0, -100, p);
        gsap.set(el, { scale, y });
      },
    });
  });
});
