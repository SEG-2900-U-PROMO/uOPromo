document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".hero");

  if (!carousel) {
    return;
  }

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const indicators = Array.from(
    carousel.querySelectorAll(".carousel-indicators button")
  );
  const previousButton = carousel.querySelector(".carousel-control.prev");
  const nextButton = carousel.querySelector(".carousel-control.next");

  if (slides.length === 0 || indicators.length !== slides.length) {
    return;
  }

  let currentIndex = slides.findIndex((slide) =>
    slide.classList.contains("active")
  );
  let intervalId;

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === currentIndex;
      indicator.classList.toggle("active", isActive);
      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const startAutoPlay = () => {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  };

  const stopAutoPlay = () => {
    window.clearInterval(intervalId);
  };

  previousButton?.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    startAutoPlay();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    startAutoPlay();
  });

  indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
      showSlide(indicatorIndex);
      startAutoPlay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  carousel.addEventListener("focusin", stopAutoPlay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      startAutoPlay();
    }
  });

  showSlide(currentIndex);
  startAutoPlay();
});