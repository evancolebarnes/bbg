import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/render-restaurants-map.js
function t() {
	let e = L.icon({
		iconUrl: "https://cdn.prod.website-files.com/6a27ccdf61e7128fd774b871/6a5d28b0e35f7d14438359b4_Map%20Pin.svg",
		iconSize: [20, 30],
		iconAnchor: [20, 50],
		popupAnchor: [0, -45]
	}), t = L.map("map", { zoomControl: !0 });
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: "&copy; OpenStreetMap contributors",
		maxZoom: 19
	}).addTo(t);
	let n = L.layerGroup().addTo(t);
	function r() {
		return [...document.querySelectorAll(".restaurant_item")].filter((e) => window.getComputedStyle(e).display !== "none");
	}
	function i() {
		n.clearLayers();
		let i = r();
		if (!i.length) return;
		let a = [];
		i.forEach((t) => {
			let r = parseFloat(t.dataset.lat), i = parseFloat(t.dataset.long);
			if (isNaN(r) || isNaN(i)) return;
			a.push([r, i]);
			let o = t.querySelector(".restaurant_name")?.textContent.trim() || "", s = t.querySelector(".restaurant_details_wrap")?.textContent.trim() || "", c = L.marker([r, i], { icon: e }).addTo(n);
			c.bindPopup(`<strong>${o}</strong><br>${s}`), c.on("mouseover", () => c.openPopup()), c.on("mouseout", () => c.closePopup());
		}), a.length === 1 ? t.setView(a[0], 12) : t.fitBounds(a, {
			padding: [60, 60],
			maxZoom: 12
		}), t.invalidateSize();
	}
	i(), window.fsAttributes = window.fsAttributes || [], window.fsAttributes.push(["list", (e) => {
		e.forEach((e) => {
			e.listInstance.on("renderitems", () => {
				i();
			});
		});
	}]);
}
//#endregion
e((() => {}))();
export { t as default };
