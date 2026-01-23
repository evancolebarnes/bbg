const setSvg = async (targetSelector, link) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  try {
    const res = await fetch(link);
    if (!res.ok) throw new Error("SVG fetch failed");

    const svg = await res.text();
    target.innerHTML = svg;
  } catch (err) {
    console.error("SVG load error:", err);
  }
};
