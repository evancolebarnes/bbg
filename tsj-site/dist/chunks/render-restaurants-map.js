import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/render-restaurants-map.js
function t() {
	let e = L.icon({
		iconUrl: "https://cdn.prod.website-files.com/6a27ccdf61e7128fd774b871/6a5d28b0e35f7d14438359b4_Map%20Pin.svg",
		iconSize: [20, 30],
		iconAnchor: [20, 50],
		popupAnchor: [0, -45]
	}), t = L.map("map");
	L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
		attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
		subdomains: "abcd",
		maxZoom: 20
	}).addTo(t);
	let n = L.layerGroup().addTo(t);
	function r() {
		n.clearLayers();
		let r = [...document.querySelectorAll(".restaurant_item")].filter((e) => getComputedStyle(e).display !== "none");
		if (!r.length) return;
		let i = [];
		r.forEach((t) => {
			let r = parseFloat(t.dataset.lat), a = parseFloat(t.dataset.long);
			if (isNaN(r) || isNaN(a)) return;
			i.push([r, a]);
			let o = L.marker([r, a], { icon: e }).addTo(n), s = t.querySelector(".restaurant_name")?.textContent.trim() ?? "", c = t.querySelector(".restaurant_details_wrap")?.textContent.trim() ?? "";
			o.bindPopup(`<strong>${s}</strong><br>${c}`), o.on("mouseover", () => o.openPopup()), o.on("mouseout", () => o.closePopup());
		}), i.length === 1 ? t.setView(i[0], 12) : t.fitBounds(i, {
			padding: [60, 60],
			maxZoom: 12
		}), t.invalidateSize();
	}
	r(), window.FinsweetAttributes ||= [], window.FinsweetAttributes.push(["list", ([e]) => {
		e.watch(() => e.items.value, () => {
			requestAnimationFrame(() => {
				r();
			});
		}, { deep: !0 });
	}]);
}
//#endregion
e((() => {}))();
export { t as default };
