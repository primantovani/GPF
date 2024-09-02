// js carroseis
document.addEventListener("DOMContentLoaded", function () {
  const prevButtons = document.querySelectorAll(".carousel-prev");
  const nextButtons = document.querySelectorAll(".carousel-next");

  for (let prevButton of prevButtons) {
    // voltar slide

    prevButton.addEventListener("click", function () {
      const carousel = prevButton.parentElement.querySelector(".carousel");
      const itemWidth = carousel.querySelector("a").offsetWidth;
      const numItemsVisible = Math.floor(carousel.offsetWidth / itemWidth);
      carousel.scrollTo({
        left: carousel.scrollLeft - itemWidth * numItemsVisible,
        behavior: "smooth",
      });
    });
  }

  for (let nextButton of nextButtons) {
    nextButton.addEventListener("click", function () {
      const carousel = nextButton.parentElement.querySelector(".carousel");
      const itemWidth = carousel.querySelector("a").offsetWidth;
      const numItemsVisible = Math.floor(carousel.offsetWidth / itemWidth);
      // prox slide
      carousel.scrollTo({
        left: carousel.scrollLeft + itemWidth * numItemsVisible,
        behavior: "smooth",
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".btn-menu");
  const navCenter = document.querySelector(".nav-center");
  const navRight = document.querySelector(".nav-right");

  menuToggle.addEventListener("click", function () {
    navCenter.classList.toggle("opened");
    navRight.classList.toggle("opened");
  });
});
