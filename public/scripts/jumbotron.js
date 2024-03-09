$(document).ready(function() {
  let currentIndex = 0;
  const imagesCount = $('.carousel-image').length;

  function slideImages() {
    // Move carousel to the left
    $('.carousel-images').css('transform', `translateX(-${currentIndex * 100}%)`);

    // Update index for the next image
    currentIndex++;
    if (currentIndex >= imagesCount) {
      currentIndex = 0;
    }
  }

  // Set interval for the images to slide
  setInterval(slideImages, 3000); // Change images every 3 seconds
});
