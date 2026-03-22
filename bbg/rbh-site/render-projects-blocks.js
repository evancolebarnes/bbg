const generateMarkup = (title, para, isChallengeMarkup = true) => {
  if (isChallengeMarkup) {
    return `
<div class="project_challenge_block u-padding-block-4">
    <div class="project_challenge_block_title">${title}</div>
    <p class="project_challenge_block_para u-text-style-text-md u-margin-top-2">${para}
    </p>
</div>`;
  } else {
    return `<div class="project_expectation_block_title_wrap u-flex-vertical-nowrap u-gap-2">
    <div class="project_expectation_block_title u-text-style-display-xs">${title}</div>
    <div id="" class="c_divider u-width-full u-position-relative u-flex-noshrink">
        <div data-wf--custom-background--background-color="beige-400"
            class="c-background w-variant-493e5a41-734d-3d16-3b16-3049842c4cae u-width-full u-height-full u-position-absolute u-width-full u-height-full u-pointer-off u-zindex-negative">
            <div class="c-background-components u-width-full u-height-full"></div>
        </div>
    </div>
    <p class="project_expectation_block_para u-text-style-text-md">${para}</p>
</div>`;
  }
};

const renderBlocks = (parentEl, targetEl, isChallengeMarkup = true) => {
  const parent = document.querySelector(parentEl);
  const richText = parent.querySelector(".w-richtext").innerHTML;
  const target = document.querySelector(targetEl);

  target.innerHTML = "";

  const parser = new DOMParser();

  const doc = parser.parseFromString(richText, "text/html");

  const allTitles = [...doc.querySelectorAll("h4")].map((h) => h.textContent);
  const allPara = [...doc.querySelectorAll("p")]
    .filter((p) => {
      const text = p.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
      return text.length > 0;
    })
    .map((p) => p.textContent);

  allTitles.forEach((title, i) => {
    const html = generateMarkup(title, allPara[i], isChallengeMarkup);
    target.insertAdjacentHTML("beforeend", html);
  });
};
