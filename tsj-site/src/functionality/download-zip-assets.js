export default function downloadZipAssets() {
  const selectAll = document.getElementById("select-all");
  const downloadWrap = document.querySelector(".category_download_all_wrap");
  const downloadBtn = document.querySelector(
    "[data-download-all] .clickable_btn",
  );

  if (!selectAll || !downloadWrap || !downloadBtn) return;

  let selectedFiles = [];

  const getCheckboxes = () => [
    ...document.querySelectorAll(".assets_list input[type='checkbox']"),
  ];

  function setCheckboxState(input, checked) {
    input.checked = checked;

    const custom = input
      .closest(".w-checkbox")
      ?.querySelector(".w-checkbox-input");

    if (custom) {
      custom.classList.toggle("w--redirected-checked", checked);
      custom.classList.toggle("w--redirected-focus", false);
    }
  }

  function updateSelectedFiles() {
    selectedFiles = [];

    const checkboxes = getCheckboxes();

    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) return;

      const row = checkbox.closest(".asset_row");
      const link = row.querySelector(".asset_download_link a");

      selectedFiles.push({
        title: link.download,
        url: link.href,
      });
    });

    downloadWrap.classList.toggle("is-not-visible", selectedFiles.length === 0);

    const allChecked =
      checkboxes.length > 0 && checkboxes.every((cb) => cb.checked);

    setCheckboxState(selectAll, allChecked);

    console.log(selectedFiles);
  }

  // Select / Deselect All
  selectAll.addEventListener("change", () => {
    const checked = selectAll.checked;

    getCheckboxes().forEach((checkbox) => {
      setCheckboxState(checkbox, checked);
    });

    updateSelectedFiles();
  });

  // Individual checkbox changes
  document.addEventListener("change", (e) => {
    if (!e.target.matches(".assets_list input[type='checkbox']")) return;

    updateSelectedFiles();
  });

  // Download ZIP
  downloadBtn.addEventListener("click", async () => {
    if (!selectedFiles.length) return;

    const zip = new JSZip();

    for (const file of selectedFiles) {
      try {
        const response = await fetch(file.url);

        if (!response.ok) continue;

        zip.file(file.title, await response.blob());
      } catch (err) {
        console.error(err);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Marketing-Assets.zip";
    a.click();

    URL.revokeObjectURL(a.href);
  });

  // Finsweet updates
  const list = document.querySelector(".assets_list");

  if (list) {
    new MutationObserver(updateSelectedFiles).observe(list, {
      childList: true,
      subtree: true,
    });
  }

  updateSelectedFiles();
}
