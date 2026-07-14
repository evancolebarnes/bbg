export default function productSlider() {
  const listWrap = document.querySelector(".products_list_wrap");
  const list = document.querySelector(".products_list");
  const items = [...document.querySelectorAll(".products_item")];

  if (!listWrap || !list || !items.length) return;

  let swiperInstance = null;

  function initSwiper() {
    const isDesktop = window.innerWidth >= 991;

    if (isDesktop) {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }

      listWrap.classList.remove("swiper");
      list.classList.remove("swiper-wrapper");
      items.forEach((item) => {
        item.classList.remove("swiper-slide");
        item.removeAttribute("style");
      });

      list.removeAttribute("style");
      listWrap.removeAttribute("style");

      return;
    }

    if (swiperInstance) return;

    listWrap.classList.add("swiper");
    list.classList.add("swiper-wrapper");
    items.forEach((item) => item.classList.add("swiper-slide"));

    swiperInstance = new Swiper(listWrap, {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
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

  initSwiper();
  window.addEventListener("resize", initSwiper);
}
