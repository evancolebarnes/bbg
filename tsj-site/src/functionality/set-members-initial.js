export default function setMembersInitial() {
  const checkMemberstack = setInterval(() => {
    if (!window.$memberstackDom) return;

    clearInterval(checkMemberstack);

    window.$memberstackDom
      .getCurrentMember()
      .then(({ data }) => {
        if (!data) {
          console.log("No member data (logged out)");
          return;
        }

        const profileImage = document.querySelector(
          '[data-ms-member="profile-image"]',
        );
        const avatarWrappers = document.querySelectorAll(
          '[data-ms-code="avatar"]',
        );

        if (data.profileImage) {
          profileImage?.style.setProperty("display", "block");

          avatarWrappers.forEach((wrap) => {
            wrap.style.setProperty("display", "none");
          });

          return;
        }

        profileImage?.style.setProperty("display", "none");

        const first =
          data.customFields["first-name"]?.trim().charAt(0).toUpperCase() || "";
        const last =
          data.customFields["last-name"]?.trim().charAt(0).toUpperCase() || "";

        let initials = first + last;

        if (!initials) {
          const fullName = data.customFields["name"]?.trim().split(" ") || [];

          initials =
            fullName.length > 1
              ? (fullName[0].charAt(0) + fullName[1].charAt(0)).toUpperCase()
              : fullName[0]?.charAt(0).toUpperCase() || "?";
        }

        avatarWrappers.forEach((wrap) => {
          wrap.style.setProperty("display", "flex");

          const initialsDivs = wrap.querySelectorAll(".ms-avatar-initial");

          if (initialsDivs.length) {
            initialsDivs.forEach((div) => {
              div.textContent = initials;
            });
          } else {
            wrap.innerHTML = `<div class="ms-avatar-initial">${initials}</div>`;
          }
        });
      })
      .catch(console.error);
  }, 100);
}
