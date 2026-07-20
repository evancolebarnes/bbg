export default function renderRestaurantsMap() {
  // ----------------------------
  // Custom Marker Icon
  // ----------------------------
  const restaurantIcon = L.icon({
    iconUrl:
      "https://cdn.prod.website-files.com/6a27ccdf61e7128fd774b871/6a5d28b0e35f7d14438359b4_Map%20Pin.svg",
    iconSize: [20, 30],
    iconAnchor: [20, 50],
    popupAnchor: [0, -45],
  });
  // ---------------------------------
  // Map
  // ---------------------------------
  const map = L.map("map");

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    },
  ).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);

  // ---------------------------------
  // Render
  // ---------------------------------
  function renderMap() {
    markerLayer.clearLayers();

    const items = [...document.querySelectorAll(".restaurant_item")].filter(
      (item) => getComputedStyle(item).display !== "none",
    );

    if (!items.length) return;

    const bounds = [];

    items.forEach((item) => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.long);

      if (isNaN(lat) || isNaN(lng)) return;

      bounds.push([lat, lng]);

      const marker = L.marker([lat, lng], {
        icon: restaurantIcon,
      }).addTo(markerLayer);

      const name =
        item.querySelector(".restaurant_name")?.textContent.trim() ?? "";

      const details =
        item.querySelector(".restaurant_details_wrap")?.textContent.trim() ??
        "";

      marker.bindPopup(`<strong>${name}</strong><br>${details}`);

      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 12);
    } else {
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 12,
      });
    }

    map.invalidateSize();
  }

  // Initial render
  renderMap();

  // ---------------------------------
  // Finsweet Watch
  // ---------------------------------
  window.FinsweetAttributes ||= [];

  window.FinsweetAttributes.push([
    "list",
    ([list]) => {
      list.watch(
        () => list.items.value,
        () => {
          requestAnimationFrame(() => {
            renderMap();
          });
        },
        {
          deep: true,
        },
      );
    },
  ]);
}
