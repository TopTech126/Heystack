function getBreakpoints() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 320) {
    return {
      0: {
        slidesPerView: 1,
      },
    };
  } else if (screenWidth < 640) {
    return {
      0: {
        slidesPerView: 1,
      },
      200: {
        slidesPerView: 2,
      },
    };
  } else {
    return {
      0: {
        slidesPerView: 1,
      },
      200: {
        slidesPerView: 2,
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
    };
  }
}


var swiper = new Swiper(".retailers-content", {
  slidesPerView: 6,
  spaceBetween: 10,
  loop: true,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: getBreakpoints(),
});


window.addEventListener('resize', function () {
  swiper.params.breakpoints = getBreakpoints();
  swiper.update();
});
