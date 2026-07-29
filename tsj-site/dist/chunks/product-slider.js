import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/product-slider.js
function t() {
	let e = document.querySelector(".products_list_wrap"), t = document.querySelector(".products_list"), n = [...document.querySelectorAll(".products_item")];
	if (!e || !t || !n.length) return;
	let r = null;
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
//#endregion
e((() => {
	initSwiper(), window.addEventListener("resize", initSwiper);
}))();
export { t as default };
