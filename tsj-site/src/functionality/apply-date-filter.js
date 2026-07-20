export default function applyDateFilter() {
  const datePicker = document.querySelector(".form_field.is-date-filter");
  const calendarIcon = document.querySelector(".category_filter_calender_icon");

  if (!datePicker) return;

  window.FinsweetAttributes ||= [];
  window.FinsweetAttributes.push([
    "list",
    ([listInstance]) => {
      const toggleCalendarIcon = (instance) => {
        calendarIcon?.classList.toggle(
          "u-display-none",
          instance.input.value.trim() !== "",
        );
      };

      flatpickr(datePicker, {
        mode: "range",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d M Y",
        allowInput: true,
        clickOpens: true,
        monthSelectorType: "dropdown",
        disableMobile: true,

        onReady(selectedDates, dateStr, instance) {
          toggleCalendarIcon(instance);
        },

        onValueUpdate(selectedDates, dateStr, instance) {
          toggleCalendarIcon(instance);
        },

        onChange(selectedDates, dateStr, instance) {
          toggleCalendarIcon(instance);

          const [start, end] = selectedDates;

          if (start) start.setHours(0, 0, 0, 0);
          if (end) end.setHours(23, 59, 59, 999);

          listInstance.items.value.forEach((item) => {
            const dateElement = item.element.querySelector(
              '[fs-list-field="date"]',
            );

            if (!dateElement) return;

            const itemDate = new Date(dateElement.dataset.date);
            itemDate.setHours(12, 0, 0, 0);

            const visible =
              (!start || itemDate >= start) && (!end || itemDate <= end);

            item.element.style.display = visible ? "" : "none";
          });
        },

        onClose(selectedDates, dateStr, instance) {
          toggleCalendarIcon(instance);

          if (!selectedDates.length) {
            listInstance.items.value.forEach((item) => {
              item.element.style.display = "";
            });
          }
        },
      });
    },
  ]);
}
