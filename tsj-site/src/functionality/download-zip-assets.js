// export default function downloadZipAssets() {
//   const selectAll = document.getElementById("select-all");
//   const downloadWrap = document.querySelector(".category_download_all_wrap");
//   const downloadBtn = document.querySelector(
//     "[data-download-all] .clickable_btn",
//   );

//   if (!selectAll || !downloadWrap || !downloadBtn) return;

//   let selectedFiles = [];

//   const getCheckboxes = () => [
//     ...document.querySelectorAll(".assets_list input[type='checkbox']"),
//   ];

//   function setCheckboxState(input, checked) {
//     input.checked = checked;

//     const custom = input
//       .closest(".w-checkbox")
//       ?.querySelector(".w-checkbox-input");

//     if (custom) {
//       custom.classList.toggle("w--redirected-checked", checked);
//       custom.classList.toggle("w--redirected-focus", false);
//     }
//   }

//   function updateSelectedFiles() {
//     selectedFiles = [];

//     const checkboxes = getCheckboxes();

//     checkboxes.forEach((checkbox) => {
//       if (!checkbox.checked) return;

//       const row = checkbox.closest(".asset_row");
//       const link = row.querySelector(".asset_download_link a");

//       selectedFiles.push({
//         title: link.download,
//         url: link.href,
//       });
//     });

//     downloadWrap.classList.toggle("is-not-visible", selectedFiles.length === 0);

//     const allChecked =
//       checkboxes.length > 0 && checkboxes.every((cb) => cb.checked);

//     setCheckboxState(selectAll, allChecked);

//     console.log(selectedFiles);
//   }

//   // Select / Deselect All
//   selectAll.addEventListener("change", () => {
//     const checked = selectAll.checked;

//     getCheckboxes().forEach((checkbox) => {
//       setCheckboxState(checkbox, checked);
//     });

//     updateSelectedFiles();
//   });

//   // Individual checkbox changes
//   document.addEventListener("change", (e) => {
//     if (!e.target.matches(".assets_list input[type='checkbox']")) return;

//     updateSelectedFiles();
//   });

//   // Download ZIP
//   downloadBtn.addEventListener("click", async () => {
//     if (!selectedFiles.length) return;

//     const zip = new JSZip();

//     for (const file of selectedFiles) {
//       try {
//         const response = await fetch(file.url);

//         if (!response.ok) continue;

//         zip.file(file.title, await response.blob());
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     const blob = await zip.generateAsync({ type: "blob" });

//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "Marketing-Assets.zip";
//     a.click();

//     URL.revokeObjectURL(a.href);
//   });

//   // Finsweet updates
//   const list = document.querySelector(".assets_list");

//   if (list) {
//     new MutationObserver(updateSelectedFiles).observe(list, {
//       childList: true,
//       subtree: true,
//     });
//   }

//   updateSelectedFiles();
// }

export default function downloadZipAssets() {
  // ------------------------------------------
  // ELEMENTS
  // ------------------------------------------

  const selectAll = document.getElementById("select-all");

  const downloadWrap = document.querySelector(".category_download_all_wrap");

  const downloadBtn = document.querySelector(
    "[data-download-all] .clickable_btn",
  );

  if (!selectAll || !downloadWrap || !downloadBtn) {
    console.warn("Download assets: required elements not found.");
    return;
  }

  let selectedFiles = [];

  // ------------------------------------------
  // GET INDIVIDUAL FILE CHECKBOXES
  // ------------------------------------------

  function getFileCheckboxes() {
    return [
      ...document.querySelectorAll(".assets_list input[type='checkbox']"),
    ].filter((checkbox) => checkbox !== selectAll);
  }

  // ------------------------------------------
  // UPDATE SELECTED FILES
  // ------------------------------------------

  function updateSelectedFiles() {
    const checkboxes = getFileCheckboxes();

    selectedFiles = [];

    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) return;

      const row = checkbox.closest(".asset_row");

      if (!row) {
        console.warn(
          "Selected checkbox does not have .asset_row parent:",
          checkbox,
        );
        return;
      }

      const link = row.querySelector(".asset_download_link a");

      if (!link) {
        console.warn("No download link found for selected row:", row);
        return;
      }

      selectedFiles.push({
        title:
          link.getAttribute("download") || link.textContent.trim() || "file",

        url: link.href,
      });
    });

    // ------------------------------------------
    // SHOW / HIDE DOWNLOAD ALL
    // ------------------------------------------

    downloadWrap.classList.toggle("is-not-visible", selectedFiles.length === 0);

    // ------------------------------------------
    // UPDATE SELECT ALL STATE
    // ------------------------------------------

    const allChecked =
      checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox.checked);

    // Keep native select-all checkbox in sync
    // WITHOUT manually changing Webflow classes.
    if (selectAll.checked !== allChecked) {
      selectAll.checked = allChecked;
    }

    console.log("Selected files:", selectedFiles);

    console.log("Select all:", allChecked);
  }

  // ------------------------------------------
  // SELECT / DESELECT ALL
  // ------------------------------------------

  selectAll.addEventListener("change", function () {
    const shouldCheck = this.checked;

    console.log("Select all clicked:", shouldCheck);

    const checkboxes = getFileCheckboxes();

    checkboxes.forEach((checkbox) => {
      // Only click when a state change is needed.
      //
      // This is important because .click()
      // allows Webflow to update its custom
      // checkbox UI as well.
      if (checkbox.checked !== shouldCheck) {
        checkbox.click();
      }
    });

    updateSelectedFiles();
  });

  // ------------------------------------------
  // INDIVIDUAL CHECKBOXES
  // ------------------------------------------

  document.addEventListener("change", function (event) {
    const checkbox = event.target;

    if (!checkbox.matches(".assets_list input[type='checkbox']")) {
      return;
    }

    // Select-all has its own handler.
    if (checkbox === selectAll) {
      return;
    }

    updateSelectedFiles();
  });

  // ------------------------------------------
  // DOWNLOAD ALL AS ZIP
  // ------------------------------------------

  downloadBtn.addEventListener("click", async function () {
    if (!selectedFiles.length) {
      console.warn("Download All clicked but no files are selected.");
      return;
    }

    const zip = new JSZip();

    downloadBtn.classList.add("is-loading");

    let successfulDownloads = 0;

    // ----------------------------------------
    // DOWNLOAD EACH SELECTED FILE
    // ----------------------------------------

    for (const file of selectedFiles) {
      try {
        console.log("Downloading:", file.title);

        const response = await fetch(file.url);

        if (!response.ok) {
          console.error(
            `Failed to download ${file.title}:`,
            response.status,
            response.statusText,
          );

          continue;
        }

        const blob = await response.blob();

        console.log(
          `Downloaded ${file.title}:`,
          (blob.size / 1024 / 1024).toFixed(2),
          "MB",
        );

        zip.file(file.title, blob);

        successfulDownloads++;
      } catch (error) {
        console.error(`Failed to download ${file.title}:`, error);
      }
    }

    // ----------------------------------------
    // NOTHING DOWNLOADED
    // ----------------------------------------

    if (successfulDownloads === 0) {
      console.error("No files could be downloaded.");

      downloadBtn.classList.remove("is-loading");

      return;
    }

    // ----------------------------------------
    // GENERATE ZIP
    // ----------------------------------------

    try {
      console.log("Generating ZIP...");

      const blob = await zip.generateAsync({
        type: "blob",

        // Important for already-compressed
        // ZIP assets.
        compression: "STORE",
      });

      console.log("ZIP generated:", (blob.size / 1024 / 1024).toFixed(2), "MB");

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "Marketing-Assets.zip";

      document.body.appendChild(link);

      link.click();

      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      console.log("ZIP download started.");
    } catch (error) {
      console.error("Failed to generate ZIP:", error);
    }

    downloadBtn.classList.remove("is-loading");
  });

  // ------------------------------------------
  // FINSWEET CMS UPDATES
  // ------------------------------------------

  const list = document.querySelector(".assets_list");

  if (list) {
    const observer = new MutationObserver(() => {
      updateSelectedFiles();
    });

    observer.observe(list, {
      childList: true,
      subtree: true,
    });
  }

  // ------------------------------------------
  // INITIAL STATE
  // ------------------------------------------

  updateSelectedFiles();
}
