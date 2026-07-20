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
  // ----------------------------
  // Initialize Map
  // ----------------------------
  const map = L.map("map", {
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);

  // ----------------------------
  // Get Visible Restaurants
  // ----------------------------
  function getVisibleRestaurants() {
    return [...document.querySelectorAll(".restaurant_item")].filter((item) => {
      return window.getComputedStyle(item).display !== "none";
    });
  }

  // ----------------------------
  // Render Markers
  // ----------------------------
  function renderMap() {
    markerLayer.clearLayers();

    const items = getVisibleRestaurants();

    if (!items.length) return;

    const bounds = [];

    items.forEach((item) => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.long);

      if (isNaN(lat) || isNaN(lng)) return;

      bounds.push([lat, lng]);

      const name =
        item.querySelector(".restaurant_name")?.textContent.trim() || "";

      const address =
        item.querySelector(".restaurant_details_wrap")?.textContent.trim() ||
        "";

      const marker = L.marker([lat, lng], {
        icon: restaurantIcon,
      }).addTo(markerLayer);

      marker.bindPopup(`<strong>${name}</strong><br>${address}`);

      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
    });

    // Show first restaurant if only one result
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

  // ----------------------------
  // Re-render after Finsweet filters
  // ----------------------------
  window.fsAttributes = window.fsAttributes || [];

  window.fsAttributes.push([
    "list",
    (lists) => {
      lists.forEach((list) => {
        list.listInstance.on("renderitems", () => {
          renderMap();
        });
      });
    },
  ]);
}
