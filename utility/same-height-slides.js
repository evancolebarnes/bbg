(function () {
  function setSliderHeight(config) {
    const sliders = document.querySelectorAll(config.slider);

    sliders.forEach(slider => {
      const slides = slider.querySelectorAll(config.slide);
      const mask = slider.querySelector(config.mask);

      if (!slides.length || !mask) return;

      let maxHeight = 0;

      slides.forEach(slide => {
        slide.style.height = 'auto';
        const height = slide.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const heightInRem = maxHeight / rootFontSize;

      mask.style.height = heightInRem + 'rem';
    });
  }

  window.bbG_Utility ||= {};
  
  window.bbG_Utility.SliderHeightUtility = setSliderHeight;
})();
