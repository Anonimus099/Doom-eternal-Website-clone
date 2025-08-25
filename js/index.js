/* FOR DOOM WEBSITE */
window.addEventListener("scroll", function () {
  const scroll = document.getElementById("scrollMenu");
  const scrollPos = window.scrollY;
  if (scrollPos > 10) {
    scroll.style.backgroundColor = "rgba(29, 29, 29)";
  } else {
    scroll.style.backgroundColor = "rgba(29,29,29,0.75)";
  }
});

const buyNowBtn = document.getElementById("buyNowBtn");
const buyNowSection = document.getElementById("buyNow");
buyNowBtn.addEventListener("click", function () {
  buyNowSection.scrollIntoView({ behavior: "smooth" });
});

const sideBarMenu = document.getElementById("sidebarMenu");
const burgerMenu = document.getElementById("burgerMenu");
const closeMenu = document.getElementById("closeMenu");

const menuBar = document.getElementById("menuBarItem");
const menu__navBar = document.getElementById("menu__navBar");
const closeBtn = document.getElementById("closeBtn");
const __navBar = document.getElementById("__navBar");
__navBar.addEventListener("click", function () {
  document.body.style.overflow = "hidden";
  menuBar.classList.remove("-translate-y-full");
  menuBar.classList.add("translate-y-0");
});
menu__navBar.addEventListener("click", function () {
  document.body.style.overflow = "hidden";
  menuBar.classList.remove("-translate-y-full");
  menuBar.classList.add("translate-y-0");
});
closeBtn.addEventListener("click", function () {
  document.body.style.overflow = "visible";
  menuBar.classList.remove("translate-y-0");
  menuBar.classList.add("-translate-y-full");
});

burgerMenu.addEventListener("click", function () {
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = "15px";
  closeMenu.classList.remove("hidden");
  sideBarMenu.classList.remove("-translate-x-full");
  sideBarMenu.classList.add("translate-x-0");
  burgerMenu.classList.add("hidden");
  sideBarMenu.style.backgroundColor = "white";
  sideBarMenu.style.color = "black";
});

closeMenu.addEventListener("click", function () {
  document.body.style.overflow = "visible";
  document.body.style.paddingRight = "0";
  sideBarMenu.classList.remove("translate-x-0");
  sideBarMenu.classList.add("-translate-x-full");
  closeMenu.classList.add("hidden");
  burgerMenu.classList.remove("hidden");
});
/* FOR DOOM WEBSITE */
/* FOR DOOM WEBSITE */
/* Кнопка для открытия видео */
document.getElementById("openVideoBtn").addEventListener("click", function () {
  // Создаем модальное окно
  const modal = document.createElement("div");
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = "15px";
  modal.className =
    "fixed inset-0 bg-black flex items-center justify-center z-50 flex-col";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

  // Создаем элемент видео
  const video = document.createElement("video");
  video.controls = true;
  video.src = "/img/video/20-38-57.mp4"; // Укажите путь к вашему видео
  video.className = "rounded";
  video.style.border = "none";
  video.style.maxWidth = "80%"; // Ограничиваем ширину видео
  video.style.maxHeight = "80%"; // Ограничиваем высоту видео

  // Создаем кнопку закрытия
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&#10005;";
  closeButton.style.fontSize = "25px";
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.className = "mt-2 text-white p-2 rounded cursor-pointer";

  // Добавляем обработчик события для закрытия видео
  closeButton.addEventListener("click", function () {
    modal.remove(); // Удаляем модальное окно
    video.pause(); // Останавливаем видео
    video.currentTime = 0; // Сбрасываем время видео
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0";
  });

  // Добавляем элементы в модальное окно
  modal.appendChild(closeButton);
  modal.appendChild(video);

  // Добавляем модальное окно в body
  document.body.appendChild(modal);

  // Начинаем воспроизведение видео
  video.play();
});
/* FOR DOOM WEBSITE */
/* ================ SLIDER FOR DOOM WEBSITE ================ */
const imgSlider = document.querySelectorAll(".imgSlider");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const captionTitle = document.getElementById("sliderCaptionTitle");
const captionText = document.getElementById("sliderCaptionText");
let count = 0;

// Показать первый слайд при загрузке
imgSlider[count].classList.remove("hidden");

function updateSlides() {
  imgSlider.forEach((slide, index) => {
    slide.classList.toggle("hidden", index !== count);
  });

  const active = imgSlider[count];
  if (captionTitle && captionText && active) {
    captionTitle.textContent = active.getAttribute("data-title") || "";
    captionText.textContent = active.getAttribute("data-text") || "";
  }
}

function nextSlide() {
  count = (count + 1) % imgSlider.length;
  updateSlides();
}

// Инициализировать подписи для первого слайда
updateSlides();

// Автоматический переход слайдов каждые 8 секунд
setInterval(nextSlide, 8000);

leftArrow.addEventListener("click", function () {
  count = (count - 1 + imgSlider.length) % imgSlider.length;
  updateSlides();
});

rightArrow.addEventListener("click", function () {
  nextSlide();
});

/* FOR DOOM WEBSITE */

const right__nav_btn = document.getElementById("right__nav-btn");
right__nav_btn.addEventListener("click", function () {
  window.location.href = "./SignUP.html";
});
