import { n as e } from "./rolldown-runtime.js";
//#region src/functionality/render-restaurants-map.js
function t() {
	let e = L.icon({
		iconUrl: "https://cdn.prod.website-files.com/6a27ccdf61e7128fd774b871/6a5d28b0e35f7d14438359b4_Map%20Pin.svg",
		iconSize: [20, 30],
		iconAnchor: [20, 50],
		popupAnchor: [0, -45]
	}), t = L.map("map");
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
			let o = L.marker([r, i], { icon: e }).addTo(n), s = t.querySelector(".restaurant_name")?.textContent.trim() || "", c = t.querySelector(".restaurant_details_wrap")?.textContent.trim() || "";
			o.bindPopup(`<strong>${s}</strong><br>${c}`), o.on("mouseover", () => o.openPopup()), o.on("mouseout", () => o.closePopup());
		}), a.length === 1 ? t.setView(a[0], 12) : t.fitBounds(a, {
			padding: [60, 60],
			maxZoom: 12
		}), t.invalidateSize();
	}
	i(), window.FinsweetAttributes ||= [], window.FinsweetAttributes.push(["list", (e) => {
		console.log("Finsweet loaded", e), e.forEach((e) => {
			console.log("Listening to renderitems"), e.on("renderitems", () => {
				console.log("renderitems fired"), i();
			});
		});
	}]);
}
//#endregion
e((() => {}))();
export { t as default };
