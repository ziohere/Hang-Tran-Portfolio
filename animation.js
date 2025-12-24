/* =========================
   DROPDOWN MENU
========================= */
function toggleDropdown() {
  document.getElementById("dropdownMenu")?.classList.toggle("show");
}

window.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document
      .querySelectorAll(".dropdown-content")
      .forEach(m => m.classList.remove("show"));
  }
});

/* =========================
   TYPEWRITER
========================= */
function typeWriter(el, text, speed = 50, cb) {
  if (!el) return;

  el.textContent = "";
  let i = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  const timer = setInterval(() => {
    cursor.before(text[i]);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      cursor.remove();
      cb && cb();
    }
  }, speed);
}

/* =========================
   PAGE LOAD
========================= */
window.addEventListener("load", () => {
  const title = document.getElementById("hero-title");
  const text = document.getElementById("hero-text");

  if (title && text) {
    typeWriter(title, "Welcome to my portfolio", 80, () => {
      typeWriter(
        text,
        "This is Hang. I am a passionate artist with a desire to conquer the world with my silliness, happiness and also laziness.\n\nChoose me or there will be consequences.",
        30
      );
    });
  }

  const frame = document.getElementById("portfolio-frame");
  if (frame) setTimeout(() => frame.classList.add("frame-float"), 1400);
});

/* =========================
   IMAGE ORIENTATION DETECT
========================= */
document.querySelectorAll(".grid-item").forEach(img => {
  if (img.complete) classify(img);
  else img.onload = () => classify(img);
});

function classify(img) {
  img.classList.add(
    img.naturalHeight > img.naturalWidth ? "portrait" : "landscape"
  );
}

/* =========================
   LIGHTBOX
========================= */
const images = document.querySelectorAll(".grid-item"); 
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

let currentIndex = 0;

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.add("show");
  lightboxImg.src = images[currentIndex].src;
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = e => e.target === lightbox && closeLightbox();

/* Keyboard */
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeLightbox();
});

/* Swipe */
let startX = 0;
lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextImage();
  if (endX - startX > 50) prevImage();
});

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

/* =========================
   GLITTER CURSOR
========================= */
const cursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const sparkle = document.createElement("div");
  sparkle.className = "cursor-sparkle";
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
});
