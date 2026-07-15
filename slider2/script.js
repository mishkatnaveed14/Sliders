document.addEventListener("DOMContentLoaded", function () {
  var swiperEl = document.querySelector(".menu-swiper");
  if (!swiperEl || typeof Swiper === "undefined") {
    return;
  }

  var menuSwiper = new Swiper(swiperEl, {
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: -40,
    watchSlidesProgress: true,
    grabCursor: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 32,
      stretch: 0,
      depth: 260,
      modifier: 1,
      slideShadows: false,
    },
    speed: 700,
    cssMode: false,
    watchOverflow: true,
    // autoplay
    autoplay: {
      delay: 3000, // every 3 seconds
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: false,

    navigation: {
      nextEl: ".menu-nav-next",
      prevEl: ".menu-nav-prev",
    },
    pagination: {
      el: ".menu-pagination",
      clickable: true,
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous dish",
      nextSlideMessage: "Next dish",
      slideLabelMessage: "Dish {{index}} of {{slidesLength}}",
    },
    breakpoints: {
      0: {
        spaceBetween: -24,
        coverflowEffect: {
          rotate: 18,
          depth: 140,
          stretch: 0,
          modifier: 1,
        },
      },
      768: {
        spaceBetween: -32,
        coverflowEffect: {
          rotate: 26,
          depth: 200,
          stretch: 0,
          modifier: 1,
        },
      },
      1200: {
        spaceBetween: -40,
        coverflowEffect: {
          rotate: 32,
          depth: 260,
          stretch: 0,
          modifier: 1,
        },
      },
    },
  });

  var wrapper = document.querySelector(".menu-carousel-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", function () {
      if (menuSwiper.autoplay) menuSwiper.autoplay.stop();
    });
    wrapper.addEventListener("mouseleave", function () {
      if (menuSwiper.autoplay) menuSwiper.autoplay.start();
    });
  }

  document.querySelectorAll(".btn-order").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var dishName = btn.getAttribute("data-dish") || "this dish";
      console.log("Order requested for: " + dishName);
    });
  });
});
