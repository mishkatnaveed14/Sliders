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

    /* ---------------------------------------------------------------
       Timing / easing — smooth, hardware-accelerated transitions
    --------------------------------------------------------------- */
    speed: 700, // 700ms transition
    cssMode: false, // keep transform-based rendering (GPU accelerated)
    watchOverflow: true,

    /* ---------------------------------------------------------------
       Autoplay
    --------------------------------------------------------------- */
    autoplay: {
      delay: 3000, // every 3 seconds
      disableOnInteraction: false, // keep autoplay running after manual swipes
      pauseOnMouseEnter: true, // pause on hover
    },

    /* ---------------------------------------------------------------
       Input methods
    --------------------------------------------------------------- */
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: false,

    /* ---------------------------------------------------------------
       Navigation & pagination (custom elements defined in index.html)
    --------------------------------------------------------------- */
    navigation: {
      nextEl: ".menu-nav-next",
      prevEl: ".menu-nav-prev",
    },
    pagination: {
      el: ".menu-pagination",
      clickable: true,
      bulletActiveClass: "swiper-pagination-bullet-active",
    },

    /* ---------------------------------------------------------------
       Accessibility
    --------------------------------------------------------------- */
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous dish",
      nextSlideMessage: "Next dish",
      slideLabelMessage: "Dish {{index}} of {{slidesLength}}",
    },

    /* ---------------------------------------------------------------
       Responsive breakpoints
       Mobile keeps the coverflow feel but with a tighter rotation/
       depth so the effect never looks cramped on narrow screens.
    --------------------------------------------------------------- */
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

  /* -----------------------------------------------------------------
     Pause autoplay on hover for browsers/edge-cases where the native
     `pauseOnMouseEnter` option doesn't catch pointer events fired on
     child elements (e.g. some touch-enabled laptops).
  ----------------------------------------------------------------- */
  var wrapper = document.querySelector(".menu-carousel-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", function () {
      if (menuSwiper.autoplay) menuSwiper.autoplay.stop();
    });
    wrapper.addEventListener("mouseleave", function () {
      if (menuSwiper.autoplay) menuSwiper.autoplay.start();
    });
  }

  /* -----------------------------------------------------------------
     "Order Now" button demo handler.
     Replace this with a real add-to-cart / checkout integration.
     Kept intentionally simple and framework-agnostic.
  ----------------------------------------------------------------- */
  document.querySelectorAll(".btn-order").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      // Prevent the click from being interpreted as a slide-drag by Swiper
      event.stopPropagation();

      var dishName = btn.getAttribute("data-dish") || "this dish";
      // Replace the line below with your actual ordering/cart logic.
      console.log("Order requested for: " + dishName);
    });
  });
});
