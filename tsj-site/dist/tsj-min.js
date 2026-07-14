import { n as e, t } from "./chunks/rolldown-runtime.js";
//#region src/registry.js
var n, r = e((() => {
	n = {
		productScroll: () => import("./chunks/product-scroll.js"),
		hoverLetterAnimation: () => import("./chunks/letter-hover-animation.js")
	};
})), i = /* @__PURE__ */ t((() => {
	r(), window.TSJ = { async init(e = []) {
		for (let t of e) {
			let e = n[t];
			e && (await e()).default();
		}
	} };
}));
//#endregion
export default i();
