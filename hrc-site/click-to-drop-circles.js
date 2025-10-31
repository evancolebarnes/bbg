const dropCircles = () => {
  const circlesArr = gsap.utils.toArray(
  document.querySelector(".optin_form_wrap").querySelectorAll(".bg_circle")
);
const triggerButtons = document.querySelector('[data-opt-in-popup]');

triggerButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    gsap.to(circlesArr, {
      bottom: 0,
      marginTop: 0,
      marginBottom: 0,
      ease: "bounce.out",
      duration: 2,
      stagger: { each: 0.25, from: "end" },
    });
  });
});
};

dropCircles()
