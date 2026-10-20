
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("show");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close the mobile menu after clicking a link
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Update copyright year automatically
document.getElementById("year").textContent =
  new Date().getFullYear();

// Demonstration booking form
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const appointmentDate = document.getElementById("date");

const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

appointmentDate.min = localToday;

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (appointmentDate.value < localToday) {
    formMessage.textContent =
      "Please select today or a future appointment date.";
    return;
  }

  formMessage.textContent =
    "Your form is valid! Connect a booking service to receive requests.";

  // This demonstration does not send or save booking details.
});


/* LEVEL 2: DARK MODE / LIGHT MODE */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeText.textContent = isDark ? "Light Mode" : "Dark Mode";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

// Restore the saved theme when the page loads
const savedTheme = localStorage.getItem("stitchcraft-theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");

  applyTheme(isDark);

  localStorage.setItem(
    "stitchcraft-theme",
    isDark ? "dark" : "light"
  );
});


/* LEVEL 2: GALLERY FILTERS */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach(image => {
      const matches =
        selectedCategory === "all" ||
        image.dataset.category === selectedCategory;

      image.classList.toggle("hidden", !matches);
    });
  });
});


/* LEVEL 2: GALLERY LIGHTBOX */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

galleryItems.forEach(image => {
  image.addEventListener("click", () => {
    if (image.classList.contains("hidden")) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});