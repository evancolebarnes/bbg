const createNavScroll = () => {
let wasScrolling = false;
const nav = document.querySelector('.c_navbar');

const showNav = () => {
  nav.classList.remove('nav--hidden');
  nav.classList.add('nav--visible');
}

const hideNav = () => {
  nav.classList.remove('nav--visible');
  nav.classList.add('nav--hidden');
}

ScrollTrigger.create({
	trigger: 'body',
	start: 'top center',
	end: 'bottom 50%+=100px',
  marker: true
});

setInterval(()=>{
const isScrolling = ScrollTrigger.isScrolling();

  if (isScrolling && !wasScrolling) {
     hideNav()
  } else if (!isScrolling && wasScrolling) {
    showNav();
  }
  wasScrolling = isScrolling;
}, 100);
};

createNavScroll ();
