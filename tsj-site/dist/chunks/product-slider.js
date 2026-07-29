import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/product-slider.js
function t() {
	let e = document.querySelector(".products_list_wrap"), t = document.querySelector(".products_list"), n = [...document.querySelectorAll(".products_item")];
	if (!e || !t || !n.length) return;
	let r = null;
	function i() {
		window.innerWidth, r &&= (r.destroy(!0, !0), null), e.classList.remove("swiper"), t.classList.remove("swiper-wrapper"), n.forEach((e) => {
			e.classList.remove("swiper-slide"), e.removeAttribute("style");
		}), t.removeAttribute("style"), e.removeAttribute("style");
	}
	i(), window.addEventListener("resize", i);
}
//#endregion
e((() => {}))();
export { t as default };
