import { t as e } from "./rolldown-runtime.js";
//#region src/functionality/set-members-initial.js
var t = /* @__PURE__ */ e((() => {
	document.addEventListener("DOMContentLoaded", () => {
		let e = setInterval(() => {
			window.$memberstackDom && (clearInterval(e), window.$memberstackDom.getCurrentMember().then(({ data: e }) => {
				if (!e) {
					console.log("No member data (logged out)");
					return;
				}
				let t = document.querySelector("[data-ms-member=\"profile-image\"]"), n = document.querySelectorAll("[data-ms-code=\"avatar\"]");
				if (e.profileImage) {
					t?.style.setProperty("display", "block"), n.forEach((e) => {
						e.style.setProperty("display", "none");
					});
					return;
				}
				t?.style.setProperty("display", "none");
				let r = (e.customFields["first-name"]?.trim().charAt(0).toUpperCase() || "") + (e.customFields["last-name"]?.trim().charAt(0).toUpperCase() || "");
				if (!r) {
					let t = e.customFields.name?.trim().split(" ") || [];
					r = t.length > 1 ? (t[0].charAt(0) + t[1].charAt(0)).toUpperCase() : t[0]?.charAt(0).toUpperCase() || "?";
				}
				n.forEach((e) => {
					e.style.setProperty("display", "flex");
					let t = e.querySelectorAll(".ms-avatar-initial");
					t.length ? t.forEach((e) => {
						e.textContent = r;
					}) : e.innerHTML = `<div class="ms-avatar-initial">${r}</div>`;
				});
			}).catch(console.error));
		}, 100);
	});
}));
//#endregion
export default t();
