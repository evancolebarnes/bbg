import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/download-zip-assets.js
function t() {
	let e = document.getElementById("select-all"), t = document.querySelector(".category_download_all_wrap"), n = document.querySelector("[data-download-all] .clickable_btn");
	if (!e || !t || !n) return;
	let r = [], i = () => [...document.querySelectorAll(".assets_list input[type='checkbox']")];
	function a(e, t) {
		e.checked = t;
		let n = e.closest(".w-checkbox")?.querySelector(".w-checkbox-input");
		n && (n.classList.toggle("w--redirected-checked", t), n.classList.toggle("w--redirected-focus", !1));
	}
	function o() {
		r = [];
		let n = i();
		n.forEach((e) => {
			if (!e.checked) return;
			let t = e.closest(".asset_row").querySelector(".asset_download_link a");
			r.push({
				title: t.download,
				url: t.href
			});
		}), t.classList.toggle("is-not-visible", r.length === 0);
		let o = n.length > 0 && n.every((e) => e.checked);
		a(e, o), console.log(r);
	}
	e.addEventListener("change", () => {
		let t = e.checked;
		i().forEach((e) => {
			a(e, t);
		}), o();
	}), document.addEventListener("change", (e) => {
		e.target.matches(".assets_list input[type='checkbox']") && o();
	}), n.addEventListener("click", async () => {
		if (!r.length) return;
		let e = new JSZip();
		for (let t of r) try {
			let n = await fetch(t.url);
			if (!n.ok) continue;
			e.file(t.title, await n.blob());
		} catch (e) {
			console.error(e);
		}
		let t = await e.generateAsync({ type: "blob" }), n = document.createElement("a");
		n.href = URL.createObjectURL(t), n.download = "Marketing-Assets.zip", n.click(), URL.revokeObjectURL(n.href);
	});
	let s = document.querySelector(".assets_list");
	s && new MutationObserver(o).observe(s, {
		childList: !0,
		subtree: !0
	}), o();
}
//#endregion
e((() => {}))();
export { t as default };
