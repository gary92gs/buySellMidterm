$(document).ready(function() {
  //set position variables
  let currentIndex = 0;
  const imagesCount = $('.carousel-image').length;
  // Clone the first image and add it to the end for seamless looping
  const firstImageClone = $('.carousel-image').first().clone();
  $('.carousel-images').append(firstImageClone);

  const slideImages = function() {
    // Calculate the new position
    const newPosition = -(currentIndex + 1) * 100;
    // Move carousel to the new position
    $('.carousel-images').css('transform', `translateX(${newPosition}%)`);
    //increment position after translating image
    currentIndex++;

    // Check if carousel has reached the end (including the cloned first image)
    if (currentIndex > imagesCount) {
      // Reset to the start immediately without animation for a seamless loop effect
      $('.carousel-images').css('transition', 'none'); // Disable transition for instant reset
      $('.carousel-images').css('transform', 'translateX(0)'); // Reset position
      // Reset index
      currentIndex = 0;

      // Re-enable the transition after a short delay
      setTimeout(() => {
        $('.carousel-images').css('transition', 'transform 1s ease');
      }, 50);
    }
  }

  // Set interval for the images to slide
  setInterval(slideImages, 10000);
});
