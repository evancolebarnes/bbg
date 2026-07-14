import { n as e } from "./rolldown-runtime.js";
//#region src/animations/letter-hover-animation.js
function t() {
	document.querySelectorAll("[data-hover-trigger]").forEach((e) => {
		let t = e.querySelector("[data-anim=\"letters-slide-in\"]");
		if (!t) return;
		let n = SplitText.create(t, { type: "chars" }), r = gsap.timeline({ paused: !0 });
		r.to(n.chars, {
			yPercent: -100,
			stagger: .015,
			duration: .15,
			ease: "power2.out"
		}).set(n.chars, { yPercent: 100 }).to(n.chars, {
			yPercent: 0,
			stagger: .015,
			duration: .15,
			ease: "power2.out"
		}), e.addEventListener("mouseenter", () => {
			r.restart();
		});
	});
}
//#endregion
e((() => {}))();
export { t as default };
