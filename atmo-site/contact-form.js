document.addEventListener("DOMContentLoaded", () => {
  const selectFields = document.querySelectorAll(".is-drop-down");
  const selectFieldsArr = Array.from(selectFields);

  selectFieldsArr.forEach((field) => {
    const parent = field.closest(".contact-form_input-wrap");
    const allOptions = parent.querySelectorAll("[data-value]");
    const allOptionsArr = Array.from(allOptions);
    const hiddenField = parent.querySelector('[data-field = "hidden-field"]');
    const fieldToggle = parent.querySelector(".contact-form_dropdown-toggle");
    const fieldText = parent.querySelector(".contact-form_dropdown-text");
    const optionsWrapper = parent.querySelector(
      ".contact-form_dropdown-options-wrapper"
    );
    const otherField = parent?.querySelector(".is-other-field");

    allOptionsArr.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value;
        fieldToggle.classList.add("is-active");
        hiddenField.value = value;
        fieldText.textContent = value;

        fieldToggle.click();

        if (!otherField) return;
        if (value === "Other") {
          otherField.style.display = "block";
        } else {
          otherField.style.display = "none";
        }
      });
    });
  });
});
