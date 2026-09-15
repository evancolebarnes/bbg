import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/download-zip-assets.js
function t() {
	let e = document.getElementById("select-all"), t = document.querySelector(".category_download_all_wrap"), n = document.querySelector("[data-download-all] .clickable_btn");
	if (!e || !t || !n) {
		console.warn("Download assets: required elements not found.");
		return;
	}
	let r = [];
	function i() {
		return [...document.querySelectorAll(".assets_list input[type='checkbox']")].filter((t) => t !== e);
	}
	function a() {
		let n = i();
		r = [], n.forEach((e) => {
			if (!e.checked) return;
			let t = e.closest(".asset_row");
			if (!t) {
				console.warn("Selected checkbox does not have .asset_row parent:", e);
				return;
			}
			let n = t.querySelector(".asset_download_link a");
			if (!n) {
				console.warn("No download link found for selected row:", t);
				return;
			}
			r.push({
				title: n.getAttribute("download") || n.textContent.trim() || "file",
				url: n.href
			});
		}), t.classList.toggle("is-not-visible", r.length === 0);
		let a = n.length > 0 && n.every((e) => e.checked);
		e.checked !== a && (e.checked = a), console.log("Selected files:", r), console.log("Select all:", a);
	}
	e.addEventListener("change", function() {
		let e = this.checked;
		console.log("Select all clicked:", e), i().forEach((t) => {
			t.checked !== e && t.click();
		}), a();
	}), document.addEventListener("change", function(t) {
		let n = t.target;
		n.matches(".assets_list input[type='checkbox']") && n !== e && a();
	}), n.addEventListener("click", async function() {
		if (!r.length) {
			console.warn("Download All clicked but no files are selected.");
			return;
		}
		let e = new JSZip();
		n.classList.add("is-loading");
		let t = 0;
		for (let n of r) try {
			console.log("Downloading:", n.title);
			let r = await fetch(n.url);
			if (!r.ok) {
				console.error(`Failed to download ${n.title}:`, r.status, r.statusText);
				continue;
			}
			let i = await r.blob();
			console.log(`Downloaded ${n.title}:`, (i.size / 1024 / 1024).toFixed(2), "MB"), e.file(n.title, i), t++;
		} catch (e) {
			console.error(`Failed to download ${n.title}:`, e);
		}
		if (t === 0) {
			console.error("No files could be downloaded."), n.classList.remove("is-loading");
			return;
		}
		try {
			console.log("Generating ZIP...");
			let t = await e.generateAsync({
				type: "blob",
				compression: "STORE"
			});
			console.log("ZIP generated:", (t.size / 1024 / 1024).toFixed(2), "MB");
			let n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "Marketing-Assets.zip", document.body.appendChild(r), r.click(), r.remove(), setTimeout(() => {
				URL.revokeObjectURL(n);
			}, 1e3), console.log("ZIP download started.");
		} catch (e) {
			console.error("Failed to generate ZIP:", e);
		}
		n.classList.remove("is-loading");
	});
	let o = document.querySelector(".assets_list");
	o && new MutationObserver(() => {
		a();
	}).observe(o, {
		childList: !0,
		subtree: !0
	}), a();
}
//#endregion
e((() => {}))();
export { t as default };
