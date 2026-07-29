import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/product-slider.js
function t() {
	let e = document.querySelector(".products_list_wrap"), t = document.querySelector(".products_list"), n = [...document.querySelectorAll(".products_item")];
	if (!e || !t || !n.length) return;
	let r = null;
	function i() {
		if (window.innerWidth >= 991) {
			r &&= (r.destroy(!0, !0), null), e.classList.remove("swiper"), t.classList.remove("swiper-wrapper"), n.forEach((e) => {
				e.classList.remove("swiper-slide"), e.removeAttribute("style");
			}), t.removeAttribute("style"), e.removeAttribute("style");
			return;
		}
		r ||= (e.classList.add("swiper"), t.classList.add("swiper-wrapper"), n.forEach((e) => e.classList.add("swiper-slide")), new Swiper(e, {
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: { 480: {
				slidesPerView: 2,
				spaceBetween: 20
			} },
			navigation: {
				nextEl: ".products_slider_button.is-next-button",
				prevEl: ".products_slider_button.is-prev-button"
			}
		}));
	}
	i(), window.addEventListener("resize", i);
}
//#endregion
e((() => {}))();
export { t as default };
