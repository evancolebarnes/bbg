export default {
  productScroll: () => import("./animations/product-scroll.js"),
  hoverLetterAnimation: () => import("./animations/letter-hover-animation.js"),
  productSlider: () => import("./functionality/product-slider.js"),
  setMembersInitial: () => import("./functionality/set-members-initial.js"),
  downloadZipAssets: () => import("./functionality/download-zip-assets.js"),
  renderRestaurantsMap: () =>
    import("./functionality/render-restaurants-map.js"),
};
