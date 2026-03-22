window.addEventListener("DOMContentLoaded", function () {
  const dynamicCitiesTexts = document.querySelectorAll(
    "[data-dynamic-city-text]"
  );
  const cityName = dynamicCitiesTexts[0].dataset.dynamicCityText;
  const dynamicCitiesArr = Array.from(dynamicCitiesTexts);

  dynamicCitiesArr.forEach((city) => {
    city.textContent = cityName.slice(0, 1);
  });
});
