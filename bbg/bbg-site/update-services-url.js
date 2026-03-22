document.addEventListener('DOMContentLoaded', ()=>{
	  const serviceItem = document.querySelector("[data-location]");
    const currentLocation = serviceItem.dataset.location.toLowerCase();

    const allLinks = serviceItem.querySelectorAll(".hover_link");
    const allLinksArr = Array.from(allLinks);
    allLinksArr.forEach((link) => {
      const URL = link?.href;
      const updatedURL = URL?.toLowerCase()?.replace(
        "location",
        currentLocation
      )?.replaceAll('%20','-');
      link.href = updatedURL;
    });
});
