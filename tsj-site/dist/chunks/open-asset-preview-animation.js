import { n as e } from "./rolldown-runtime.js";
//#region src/animations/open-asset-preview-animation.js
function t() {
	let e = [
		".assets_checkbox",
		".asset_download_link_wrap",
		".asset_download_link"
	];
	document.addEventListener("click", (t) => {
		let n = t.target.closest(".asset_row.is-list-asset");
		if (!n || e.some((e) => t.target.closest(e)) || t.target.matches("input[type=\"checkbox\"]")) return;
		document.querySelectorAll(".asset_preview_wrap").forEach((e) => {
			e.classList.add("is-closed");
		});
		let r = n.nextElementSibling;
		r?.classList.contains("asset_preview_wrap") && r.classList.remove("is-closed");
	});
}
//#endregion
e((() => {}))();
export { t as default };
