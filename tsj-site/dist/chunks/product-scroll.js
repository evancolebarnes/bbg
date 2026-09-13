import { n as e } from "./rolldown-runtime.js";
//#region src/animations/product-scroll.js
function t() {
	let e = gsap.utils.toArray(".why_visual_hand"), t = gsap.utils.toArray(".why_chip"), n = [
		{
			x: -100,
			y: -100
		},
		{
			x: -100,
			y: 100
		},
		{
			x: 100,
			y: 100
		},
		{
			x: 100,
			y: -100
		},
		{
			x: 100,
			y: 0
		}
	], r = [
		...e,
		".tsj_product_top",
		".tsj_product_bottom"
	], i = [".why_chips_wrap", ...t], a = (e) => gsap.set(e, { willChange: "transform, opacity" }), o = (e) => gsap.set(e, { willChange: "auto" });
	gsap.timeline({
		defaults: { ease: "none" },
		scrollTrigger: {
			trigger: ".why_track",
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
			onEnter: () => a(r),
			onEnterBack: () => a(r),
			onLeave: () => o(r),
			onLeaveBack: () => o(r)
		}
	}).fromTo(e, {
		opacity: 0,
		xPercent: (e) => n[e].x,
		yPercent: (e) => n[e].y
	}, {
		opacity: 1,
		xPercent: 0,
		yPercent: 0,
		duration: 1,
		stagger: .2
	}).to(".tsj_product_top", {
		xPercent: 50,
		yPercent: -50,
		duration: 1
	}).to(".tsj_product_bottom", {
		xPercent: -50,
		yPercent: 50,
		duration: 1
	}, "<"), gsap.timeline({
		defaults: { ease: "none" },
		scrollTrigger: {
			trigger: ".why_blocks_wrap",
			start: "top-=50% center",
			end: "bottom-=10% bottom",
			scrub: 1,
			onEnter: () => a(i),
			onEnterBack: () => a(i),
			onLeave: () => o(i),
			onLeaveBack: () => o(i)
		}
	}).fromTo(".why_chips_wrap", { scale: 0 }, {
		scale: 1,
		duration: 1.3,
		delay: .5
	}).set(".why_chips_wrap", { zIndex: 1 }, "<50%").to(t, {
		rotation: "+=90",
		stagger: .1
	}).to(t, {
		rotation: "+=90",
		stagger: .1,
		delay: .1
	}).to(".why_chips_wrap", {
		scale: 0,
		duration: .35,
		opacity: 0,
		transformOrigin: "50% 100%"
	});
}
//#endregion
e((() => {}))();
export { t as default };
