export default function openAssetPreviewAnimation() {
  const ignoreSelectors = [
    ".assets_checkbox",
    ".asset_download_link_wrap",
    ".asset_download_link",
  ];

  document.addEventListener("click", (e) => {
    const row = e.target.closest(".asset_row.is-list-asset");
    if (!row) return;

    // Ignore clicks on excluded elements
    if (ignoreSelectors.some((selector) => e.target.closest(selector))) {
      return;
    }

    // Ignore the native checkbox input
    if (e.target.matches('input[type="checkbox"]')) {
      return;
    }

    // Close all previews
    document.querySelectorAll(".asset_preview_wrap").forEach((preview) => {
      preview.classList.add("is-closed");
    });

    // Open the clicked preview
    const preview = row.nextElementSibling;

    if (preview?.classList.contains("asset_preview_wrap")) {
      preview.classList.remove("is-closed");
    }
  });
}
