const ctaMoveOverElement = (wrapEl, ctaEl) => {
  const wraps = document.querySelectorAll(wrapEl);
  wraps.forEach((wrap) => {
    const button = wrap.querySelector(ctaEl);
    const buttonRect = button.getBoundingClientRect();

    wrap.addEventListener("mousemove", (event) => {
      const wrapRect = wrap.getBoundingClientRect();

      const x = event.clientX - wrapRect.left;
      const y = event.clientY - wrapRect.top;

      button.style.left = `${x - buttonRect.width / 2}px`;
      button.style.top = `${y - buttonRect.height / 2}px`;
    });
  });
};
