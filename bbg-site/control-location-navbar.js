const showNav = (nav) => {
  nav.classList.remove("display-none");
};

document.addEventListener("DOMContentLoaded", () => {
  const defaultNav = document.querySelector(".nav_default");
  const locationNav = document.querySelector(".nav_location");

  const loc = localStorage.getItem("userLocation");

  if (!loc) {
    // no location stored, use default nav
    showNav(defaultNav);
    return;
  }

  const inputs = [...document.querySelectorAll("[data-location-input]")];
  if (!(inputs.length > 0)) {
    // safety fallback
    showNav(defaultNav);
    return;
  }

  window.fsAttributes = window.fsAttributes || [];
  //   inputs.forEach(i=>{i.value = loc});
  window.fsAttributes.push([
    "cmsfilter",
    (filterInstances) => {
      console.log("cmsfilter Successfully loaded!");
      inputs.forEach((i) => {
        i.value = loc;
        i.dispatchEvent(new Event("input", { bubbles: true }));
      });

      // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
      const [filterInstance] = filterInstances;
      a;
      // The `renderitems` event runs whenever the list renders items after filtering.
      filterInstance.listInstance.on("renderitems", (renderedItems) => {
        console.log(renderedItems);
      });
    },
  ]);

  setTimeout(() => {
    showNav(locationNav);
  }, 500);
});
