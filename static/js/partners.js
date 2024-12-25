var swiper = new Swiper(".partners-content", {
  slidesPerView: 5,
  spaceBetween: 10,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".partners-button-next",
    prevEl: ".partners-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    200: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 4,
    },
    800: {
      slidesPerView: 5,
    },
    1000: {
      slidesPerView: 6,
    },
  },
});