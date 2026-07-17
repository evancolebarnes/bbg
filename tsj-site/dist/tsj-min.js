import { n as e, r as t, t as n } from "./chunks/rolldown-runtime.js";
//#region src/registry.js
var r, i = e((() => {
	r = {
		productScroll: () => import("./chunks/product-scroll.js"),
		hoverLetterAnimation: () => import("./chunks/letter-hover-animation.js"),
		productSlider: () => import("./chunks/product-slider.js"),
		_setMembersInitial: () => import("./chunks/set-members-initial.js").then((e) => /* @__PURE__ */ t(e.default, 1))
	};
})), a = /* @__PURE__ */ n((() => {
	i(), window.TSJ = { async init(e = []) {
		for (let t of e) {
			let e = r[t];
			e && (await e()).default();
		}
	} };
}));
//#endregion
export default a();
