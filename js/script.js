const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");
const searchIcon = document.querySelector(".search__icon");
const searchClose = document.querySelector(".search__close");
const siteName = document.querySelectorAll(".site-name span"); // All site name letters
const topNavLinks = document.querySelectorAll(".top-nav a");
const bottomNavLinks = document.querySelectorAll(".bottom-nav a");

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

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.getAttribute("data-slide"));
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

window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  const topNav = document.querySelector(".top-nav");
  const bottomNav = document.querySelector(".bottom-nav");

  // Change navbar background color and header content color based on scroll
  if (window.scrollY > 50) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    searchIcon.style.color = "#000"; // Change search icon to black
    searchClose.style.color = "#000"; // Change close icon to black

    // Change site name letters to black
    siteName.forEach((span) => {
      span.style.color = "#000";
    });

    // Change top navigation links to black
    topNavLinks.forEach((link) => {
      link.style.color = "#000";
    });

    // Change bottom navigation links to black
    bottomNavLinks.forEach((link) => {
      link.style.color = "#000";
    });

    // Add the "scrolled" class to change ::after color
    topNav.classList.add("scrolled");
    bottomNav.classList.add("scrolled");
    
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0)";
    searchIcon.style.color = "#fff"; // Change search icon to white
    searchClose.style.color = "#fff"; // Change close icon to white

    // Change site name letters to white
    siteName.forEach((span) => {
      span.style.color = "#fff";
    });

    // Change top navigation links to white
    topNavLinks.forEach((link) => {
      link.style.color = "#fff";
    });

    // Change bottom navigation links to white
    bottomNavLinks.forEach((link) => {
      link.style.color = "#fff";
    });

    // Remove the "scrolled" class to revert ::after color
    topNav.classList.remove("scrolled");
    bottomNav.classList.remove("scrolled");
  }
});


