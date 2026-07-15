

const swiper = new Swiper(".mySwiper", {
    centeredSlides: true, 
    loop: true,
    
    // ---- AUTOPLAY SETTINGS (Khud chalne ke liye) ----
    autoplay: {
        delay: 1000,               // 1000ms yani har 1 second baad automatic slide badal jiayegi
        disableOnInteraction: false, // Sab se zaroori line! Agar user hath se scroll kare, tab bhi autoplay permanent band nahi hoga, chorne par dobara shuru ho jayega.
        pauseOnMouseEnter: true,   // Jab user mouse card ke upar laye ga (deals parhne ke liye), toh slider ruk jayega. Mouse hatate hi chal parega.
    },
    
    // Touch & Drag Settings
    grabCursor: true,         
    allowTouchMove: true,     
    shortSwipes: true,        
    touchRatio: 1.2,          
    resistanceRatio: 0.85,    

    watchSlidesProgress: true, 

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        320: {
            slidesPerView: 1.2,  
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1024: {
            slidesPerView: 2.5,  
            spaceBetween: 40,
        }
    }
});