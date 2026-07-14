import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/product-slider.js
function t() {
	let e = null;
	function t() {
		let t = window.innerWidth >= 991;
		console.log(t), t ? e &&= (e.destroy(!0, !0), null) : e ||= new Swiper(".swiper", {
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
		});
	}
	t(), window.addEventListener("resize", t);
}
//#endregion
e((() => {}))();
export { t as default };
