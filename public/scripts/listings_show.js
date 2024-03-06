/* eslint-disable func-style */
/* eslint-disable no-undef */
$(document).ready(function() {
  const slides = $(".slides img");
  let slideIndex = 0;

  initializeSlider();

  function initializeSlider() { // Sets the initial state of the image slider
    if (slides.length > 0) { // If there are any photos display them using addClass
      slides.first().addClass("displaySlide");
    }
  }

  function showSlide(index) {
    if (index >= slides.length) { //If we reach the end of our photos set it back to our first image
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    }
    slides.removeClass("displaySlide"); //This hides the current image before displaying the next/prev image.
    slides.eq(slideIndex).addClass("displaySlide");
  }

  $(".prev").click(function() {
    slideIndex--;
    showSlide(slideIndex);
  });

  $(".next").click(function() {
    slideIndex++;
    showSlide(slideIndex);
  });
});
