const showEl = (elArr) => {
elArr.forEach(el => {
  el.classList.remove("display-none");  
});
};

document.addEventListener("DOMContentLoaded", () => {
const defaultEl = [...document.querySelectorAll(".el_default")];
const locationEl = [...document.querySelectorAll(".el_location")];

  const loc = localStorage.getItem("userLocation");

  if (!loc) {
    // no location stored, use default nav
    showEl(defaultEl);
    return;
  }

  const input1 = document.querySelector("[data-location-input-footer]");
  const input2 = document.querySelector("[data-location-input-navbar]");
  if (!input1 || !input2) {
    // safety fallback
    showEl(defaultEl);
    return;
  }

  window.fsAttributes = window.fsAttributes || [];
  input1.value = loc;
  input2.value = loc;
  window.fsAttributes.push([
    "cmsfilter",
    (filterInstances) => {
      console.log("cmsfilter Successfully loaded!");
      input1.dispatchEvent(new Event("input", { bubbles: true }));
      input2.dispatchEvent(new Event("input", { bubbles: true }));

      // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
      const [filterInstance] = filterInstances;
      // The `renderitems` event runs whenever the list renders items after filtering.
      filterInstance.listInstance.on("renderitems", (renderedItems) => {
        console.log(renderedItems);
      });
    },
  ]);

  setTimeout(() => {
    showEl(locationEl);
  }, 500);
});
