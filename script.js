// Existing code
const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
  searchBar.classList.toggle("show-search");
});

// Throttle function to avoid rapid clicks
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}


const carousel = document.querySelector(".hero-carousel");
const slides = document.querySelectorAll(".hero-carousel-slide");
const prevButton = document.querySelector(".hero-carousel-prev");
const nextButton = document.querySelector(".hero-carousel-next");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(n) {
  if (n >= slides.length) {
    index = 0;
  } else if (n < 0) {
    index = slides.length - 1;
  } else {
    index = n;
  }
  carousel.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    showSlide(slideIndex);
  });
});

prevButton.addEventListener("click", () => {
  showSlide(index - 1);
});

nextButton.addEventListener("click", () => {
  showSlide(index + 1);
});

// Auto slide functionality
setInterval(() => {
  showSlide(index + 1);
}, 5000);


window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0)';
  }
});