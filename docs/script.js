// First slide
let slideIndex = 0;
showSlides();

function currentSlide(index){
  slideIndex = index - 1;
  showSlides();
}

function showSlides(){
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  // Initially hides all the slides
  for (i = 0; i < slides.length; i++){
    slides[i].style.display = "none";
  }
  slideIndex++;

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Once the end of the carousel is reached, go back to slide 1
  if (slideIndex > slides.length){
    slideIndex = 1;
  }

  // Displays the current slide
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 7000); // Change image every 7 seconds
}
