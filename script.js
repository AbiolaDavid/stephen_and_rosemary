const eventDate = new Date("2026-11-21T16:00:00");
const countdownEl = document.getElementById("countdown");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-panel a");

function updateCountdown() {
  const difference = eventDate.getTime() - Date.now();

  if (difference <= 0) {
    countdownEl.innerHTML = '<div class="time-box"><strong>Now</strong><span>Celebrate</span></div>';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownEl.innerHTML = `
    <div class="time-box"><strong>${days}</strong><span>Days</span></div>
    <div class="time-box"><strong>${hours}</strong><span>Hours</span></div>
    <div class="time-box"><strong>${minutes}</strong><span>Minutes</span></div>
    <div class="time-box"><strong>${seconds}</strong><span>Seconds</span></div>
  `;
}

function closeMenu() {
  navPanel.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  const sections = [...document.querySelectorAll("main section")];
  let current = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

document.getElementById("message-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const messageBox = document.getElementById("message-status");
  submitButton.disabled = true;
  messageBox.textContent = "Sending your message...";

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        message: formData.get("message"),
      }),
    });

    if (!response.ok) {
      throw new Error("Message submission failed");
    }

    const name = String(formData.get("name")).trim();
    messageBox.textContent = `Thank you, ${name}! Your message means so much to us.`;
    form.reset();
  } catch {
    messageBox.textContent = "We couldn't send your message right now. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});

const galleryCarousel = document.querySelector(".gallery-carousel");

if (galleryCarousel) {
  const gallerySlides = Array.from(galleryCarousel.querySelectorAll(".gallery-slide"));
  const galleryStage = galleryCarousel.querySelector(".gallery-stage");
  const galleryDots = Array.from(galleryCarousel.querySelectorAll(".gallery-dot"));
  const galleryStatus = document.getElementById("gallery-status");
  const previousPhoto = document.getElementById("gallery-prev");
  const nextPhoto = document.getElementById("gallery-next");
  const toggleSlideshow = document.getElementById("gallery-toggle");
  let activePhoto = 0;
  let slideshowPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let slideshowTimer;

  function fitGalleryFrame(slide) {
    const image = slide.querySelector("img");
    if (!image.naturalWidth || !image.naturalHeight) {
      return;
    }

    const ratio = image.naturalWidth / image.naturalHeight;
    const isPortrait = ratio < 1;
    const availableWidth = galleryCarousel.clientWidth || 1000;
    const borderStyle = getComputedStyle(galleryStage);
    const borderWidth = parseFloat(borderStyle.borderLeftWidth) + parseFloat(borderStyle.borderRightWidth);
    const borderHeight = parseFloat(borderStyle.borderTopWidth) + parseFloat(borderStyle.borderBottomWidth);
    const maxWidth = Math.min(availableWidth, isPortrait ? 420 : 1000);
    const maxHeight = Math.min(window.innerHeight * 0.72, 640);
    const contentWidth = Math.min(maxWidth - borderWidth, (maxHeight - borderHeight) * ratio);

    galleryStage.style.width = `${contentWidth + borderWidth}px`;
    galleryStage.style.height = `${contentWidth / ratio + borderHeight}px`;
    galleryStage.dataset.orientation = isPortrait ? "portrait" : "landscape";
  }

  function updateGallery(index) {
    activePhoto = (index + gallerySlides.length) % gallerySlides.length;
    const previousIndex = (activePhoto - 1 + gallerySlides.length) % gallerySlides.length;
    const nextIndex = (activePhoto + 1) % gallerySlides.length;
    const activeSlide = gallerySlides[activePhoto];
    const caption = activeSlide.querySelector("h3").textContent;
    fitGalleryFrame(activeSlide);

    gallerySlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activePhoto);
      slide.classList.toggle("is-before", slideIndex === previousIndex);
      slide.classList.toggle("is-after", slideIndex === nextIndex);
      slide.setAttribute("aria-hidden", String(slideIndex !== activePhoto));
      slide.setAttribute("aria-label", `${slideIndex + 1} of ${gallerySlides.length}`);
    });

    galleryDots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === activePhoto));
    });

    galleryStatus.textContent = `Photo ${activePhoto + 1} of ${gallerySlides.length}: ${caption}`;
  }

  function pauseSlideshow() {
    slideshowPaused = true;
    window.clearInterval(slideshowTimer);
    toggleSlideshow.textContent = "Play";
    toggleSlideshow.setAttribute("aria-label", "Play slideshow");
    galleryStatus.setAttribute("aria-live", "polite");
  }

  function playSlideshow() {
    slideshowPaused = false;
    window.clearInterval(slideshowTimer);
    toggleSlideshow.textContent = "Pause";
    toggleSlideshow.setAttribute("aria-label", "Pause slideshow");
    galleryStatus.setAttribute("aria-live", "off");
    slideshowTimer = window.setInterval(() => {
      updateGallery(activePhoto + 1);
    }, 5500);
  }

  function showPhoto(index) {
    updateGallery(index);
    if (!slideshowPaused) {
      playSlideshow();
    }
  }

  previousPhoto.addEventListener("click", () => showPhoto(activePhoto - 1));
  nextPhoto.addEventListener("click", () => showPhoto(activePhoto + 1));

  galleryDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showPhoto(index));
  });

  toggleSlideshow.addEventListener("click", () => {
    if (slideshowPaused) {
      playSlideshow();
    } else {
      pauseSlideshow();
    }
  });

  galleryCarousel.addEventListener("focusin", (event) => {
    if (event.target !== toggleSlideshow) {
      pauseSlideshow();
    }
  });

  gallerySlides.forEach((slide) => {
    const image = slide.querySelector("img");
    image.addEventListener("load", () => {
      if (slide === gallerySlides[activePhoto]) {
        fitGalleryFrame(slide);
      }
    });
  });

  window.addEventListener("resize", () => {
    fitGalleryFrame(gallerySlides[activePhoto]);
  });

  updateGallery(activePhoto);
  if (slideshowPaused) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
