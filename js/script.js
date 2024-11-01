document.addEventListener("DOMContentLoaded", function () {

  const gallery = document.getElementById('hiddenImages');
  for (let i = 19; i <= 117; i++) {
    const img = document.createElement('img');
    img.src = `images/img${i}.webp`;
    img.alt = `Gallery Image ${i}`;
    img.loading = "lazy";
    img.className = "gallery-img";
    img.onclick = function() { openModal(this.src); };
    gallery.insertBefore(img, gallery.querySelector('.dropdown-button')); // Insert before the Show More button
  }

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

  // Hamburger menu and off-click closing functionality
  const hamburger = document.querySelector(".hamburger");
  const menuContainer = document.querySelector(".menu-container");

  hamburger.addEventListener("click", () => {
    menuContainer.style.transform = "translateX(0)"; // Slide in the menu
  });

  // Close menu if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".menu-container") && !event.target.closest(".hamburger")) {
      menuContainer.style.transform = "translateX(100%)"; // Hide the menu
    }
  });

  menuContainer.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent closing when clicking inside the menu
  });

  // Carousel functionality
  const carousel = document.querySelector(".hero-carousel");
  const slides = document.querySelectorAll(".hero-carousel-slide");
  let index = 0;

  function showSlide(n) {
    index = (n + slides.length) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });
  }

  // Carousel functionality for About Section
  const aboutSlides = document.querySelectorAll(".about-carousel-slide");
  let aboutIndex = 0; // Start index

  function showAboutSlide(n) {
    aboutIndex = n % aboutSlides.length; // Ensures looping
    aboutSlides.forEach((slide, idx) => {
      slide.style.display = idx === aboutIndex ? "block" : "none";
    });
  }

  setInterval(() => {
    showAboutSlide(aboutIndex + 1);
  }, 3000); // Change slide every 3 seconds

  document
    .querySelector(".hero-carousel-prev")
    .addEventListener("click", () => showSlide(index - 1));
  document
    .querySelector(".hero-carousel-next")
    .addEventListener("click", () => showSlide(index + 1));
  setInterval(() => showSlide(index + 1), 5000);

  // Modal interaction for gallery images
  const galleryImages = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("imageModal");
  const modalContent = document.getElementById("modalImg");
  const closeModalButton = document.getElementById("closeModalButton");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalContent.style.backgroundImage = `url(${img.src})`;
      document.body.style.overflow = "hidden";
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Handle zooming on the modal image
  modalContent.addEventListener("click", function (event) {
    this.classList.toggle("zoomed-in");
    if (this.classList.contains("zoomed-in")) {
      this.addEventListener("mousemove", moveBackground);
    } else {
      this.removeEventListener("mousemove", moveBackground);
    }
  });

  function moveBackground(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.backgroundPosition = `${(x * 100) / rect.width}% ${
      (y * 100) / rect.height
    }%`;
  }

  // Toggle hidden images in the gallery
  const toggleButton = document.querySelector(".dropdown-button");
  const hiddenImages = document.querySelector(".hidden-images");

  toggleButton.addEventListener("click", () => {
    const isVisible = hiddenImages.style.display === "block";
    hiddenImages.style.display = isVisible ? "none" : "block";
    hiddenImages.style.opacity = isVisible ? "0" : "1";
    toggleButton.textContent = isVisible ? "Show More" : "Show Less";
  });
});
