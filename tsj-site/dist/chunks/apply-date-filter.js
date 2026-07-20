import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/apply-date-filter.js
function t() {
	let e = document.querySelector(".form_field.is-date-filter"), t = document.querySelector(".category_filter_calender_icon");
	e && (window.FinsweetAttributes ||= [], window.FinsweetAttributes.push(["list", ([n]) => {
		let r = (e) => {
			t?.classList.toggle("u-display-none", e.input.value.trim() !== "");
		};
		flatpickr(e, {
			mode: "range",
			dateFormat: "Y-m-d",
			altInput: !0,
			altFormat: "d M Y",
			allowInput: !0,
			clickOpens: !0,
			monthSelectorType: "dropdown",
			disableMobile: !0,
			onReady(e, t, n) {
				r(n);
			},
			onValueUpdate(e, t, n) {
				r(n);
			},
			onChange(e, t, i) {
				r(i);
				let [a, o] = e;
				a && a.setHours(0, 0, 0, 0), o && o.setHours(23, 59, 59, 999), n.items.value.forEach((e) => {
					let t = e.element.querySelector("[fs-list-field=\"date\"]");
					if (!t) return;
					let n = new Date(t.dataset.date);
					n.setHours(12, 0, 0, 0);
					let r = (!a || n >= a) && (!o || n <= o);
					e.element.style.display = r ? "" : "none";
				});
			},
			onClose(e, t, i) {
				r(i), e.length || n.items.value.forEach((e) => {
					e.element.style.display = "";
				});
			}
		});
	}]));
}
//#endregion
e((() => {}))();
export { t as default };
