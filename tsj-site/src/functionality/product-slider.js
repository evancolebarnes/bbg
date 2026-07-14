export default function productSlider() {
  let swiperInstance = null;

  function initSwiper() {
    const windowWidth = window.innerWidth;

    const isDesktop = windowWidth >= 991;
    console.log(isDesktop);

    if (!isDesktop) {
      if (!swiperInstance) {
        swiperInstance = new Swiper(".swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
            // When window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          },
          navigation: {
            nextEl: ".products_slider_button.is-next-button",
            prevEl: ".products_slider_button.is-prev-button",
          },
        });
      }
    } else {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }
  }

  initSwiper();

  // Run on window resize
  window.addEventListener("resize", initSwiper);
}
