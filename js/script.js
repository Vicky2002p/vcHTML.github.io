document.addEventListener("DOMContentLoaded", function () {
  // Search bar toggle functionality
  const searchBar = document.querySelector("#search-bar");
  const searchButton = document.querySelector("#search-button");
  const searchIcon = document.querySelector(".search__icon");
  const searchClose = document.querySelector(".search__close");

  searchButton.addEventListener("click", () => {
    searchBar.classList.toggle("show-search");
    const isOpen = searchBar.classList.contains("show-search");
    searchIcon.style.opacity = isOpen ? "0" : "1";
    searchClose.style.opacity = isOpen ? "1" : "0";
  });

  // Carousel functionality
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

  dots.forEach((dot, ind) => {
    dot.addEventListener("click", () => showSlide(ind));
  });

  prevButton.addEventListener("click", () => showSlide(index - 1));
  nextButton.addEventListener("click", () => showSlide(index + 1));

  // Auto-slide functionality
  setInterval(() => {
    showSlide(index + 1);
  }, 5000); // Change slide every 5 seconds

  // Scrolling effects for navbar and search bar
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      searchIcon.style.color = "#000"; // Change search icon to black
      searchClose.style.color = "#000"; // Change close icon to black
    } else {
      header.classList.remove("scrolled");
      searchIcon.style.color = "#fff"; // Change search icon to white
      searchClose.style.color = "#fff"; // Change close icon to white
    }
  });

  // Gallery modal interaction
  const galleryImages = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("imageModal");
  const modalContent = document.getElementById("modalImg"); // Ensure this is the element intended for background image
  const closeModalButton = document.getElementById("closeModalButton");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalContent.style.backgroundImage = `url(${this.src})`; // Set image as background
      modalContent.classList.remove("zoomed-in");
      modalContent.style.backgroundSize = "contain"; // Ensure the image fits initially
      modalContent.style.backgroundPosition = "center center";
      document.body.style.overflow = "hidden"; // Prevent scrolling while modal is open
    });
  });

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    modalContent.classList.remove("zoomed-in");
  });

  // Handle zooming on the modal image
  modalContent.addEventListener("click", function () {
    this.classList.toggle("zoomed-in");
    if (this.classList.contains("zoomed-in")) {
      this.style.backgroundSize = "200%"; // Or any other zoom level
      // Add mousemove event listener to handle moving the background
      this.addEventListener("mousemove", moveBackground);
    } else {
      this.style.backgroundSize = "contain";
      this.style.backgroundPosition = "center center";
      // Remove the event listener when not zoomed in
      this.removeEventListener("mousemove", moveBackground);
    }
  });

  // Function to move the background image based on mouse position
  function moveBackground(e) {
    const bounds = this.getBoundingClientRect();
    // Calculate the mouse position as a percentage of the container's dimensions
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    // Convert the coordinates to a percentage of the bounds
    const xPercent = (x / bounds.width) * 100;
    const yPercent = (y / bounds.height) * 100;
    // Update the background position
    this.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  }

    const aboutSlides = document.querySelectorAll(".about-carousel-slide");
    let aboutIndex = 0; // Start index

    function showAboutSlide(n) {
        aboutSlides.forEach(slide => slide.style.display = "none"); // Hide all slides
        if (n >= aboutSlides.length) aboutIndex = 0; // Reset to first slide if it exceeds the number
        if (n < 0) aboutIndex = aboutSlides.length - 1; // Set to last slide if less than zero
        aboutSlides[aboutIndex].style.display = "block"; // Show the current slide
    }

    showAboutSlide(aboutIndex); // Initialize the first slide

    // Function to move to the next slide
    function nextSlide() {
        showAboutSlide(aboutIndex += 1); // Increment and show next slide
    }

    // Set interval to change slide every 3 seconds
    setInterval(nextSlide, 3000); // Adjust time as needed
});
