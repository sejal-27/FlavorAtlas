// script.js
const scrollingText = document.querySelector(".scrolling-text");

function slideInText() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  if (scrollPosition > windowHeight / 2) {
    scrollingText.style.opacity = "1";
    scrollingText.style.transform = "translateX(0)";
  }
}

window.addEventListener("scroll", slideInText);
