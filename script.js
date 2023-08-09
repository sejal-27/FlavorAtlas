window.addEventListener('scroll', parallax);

function parallax() {
 
  const normalContent = document.querySelector('.normal-content');
  
  // Calculate the parallax effect
  let scrolled = window.pageYOffset;
  let parallaxPosition = scrolled * 0.5; // Adjust the speed as needed
  
  // Apply the parallax effect to the background (move to the right)  
  // Move the normal content in the opposite direction for a subtle effect (to the left)
  normalContent.style.transform = `translateX(${parallaxPosition}px)`;
}
