/* =========================================================
   Ember & Gold — Hero Section Interactions
   GSAP timeline + micro-interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  gsap.registerPlugin(ScrollTrigger);

  /* -----------------------------------------------------
     1. Ambient particles
  ----------------------------------------------------- */
  const particleWrap = document.getElementById("particles");
  const PARTICLE_COUNT = window.innerWidth < 768 ? 10 : 22;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.top = Math.random() * 100 + "%";
    p.style.left = Math.random() * 100 + "%";
    p.style.opacity = (Math.random() * 0.5 + 0.15).toFixed(2);
    const size = (Math.random() * 3 + 2).toFixed(1);
    p.style.width = size + "px";
    p.style.height = size + "px";
    particleWrap.appendChild(p);

    if (!reduceMotion) {
      gsap.to(p, {
        y: `random(-60, 60)`,
        x: `random(-40, 40)`,
        duration: gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 4,
      });
    }
  }

  /* -----------------------------------------------------
     2. Entrance timeline
  ----------------------------------------------------- */
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from('[data-anim="badge"]', { y: -16, opacity: 0, duration: 0.6 })
    .from('[data-anim="title"]', { y: 30, opacity: 0, duration: 0.8 }, "-=.3")
    .from('[data-anim="copy"]', { y: 22, opacity: 0, duration: 0.7 }, "-=.5")
    .from('[data-anim="stats"]', { y: 18, opacity: 0, duration: 0.6 }, "-=.4")
    .from(
      '[data-anim="buttons"] .btn-magnetic',
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
      "-=.35",
    )
    .from(
      '[data-anim="meta"] .meta-card',
      { y: 20, opacity: 0, duration: 0.55, stagger: 0.1 },
      "-=.35",
    )
    .from(
      ".stage-glow, .stage-ring",
      {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=1",
    )
    .from(
      "#heroCarousel",
      {
        scale: 0.6,
        opacity: 0,
        rotation: -6,
        duration: 1,
        ease: "back.out(1.2)",
      },
      "-=.7",
    )
    .from(
      ".float-item",
      {
        scale: 0,
        opacity: 0,
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.7,
        stagger: 0.07,
        ease: "back.out(2)",
      },
      "-=.6",
    )
    .from(
      ".glass-card",
      {
        scale: 0.7,
        opacity: 0,
        y: 16,
        rotation: () => gsap.utils.random(-6, 6),
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=.5",
    )
    .from(".scroll-cue", { opacity: 0, duration: 0.6 }, "-=.2");

  /* -----------------------------------------------------
     3. Infinite float loops (dish + ingredients + cards)
  ----------------------------------------------------- */
  if (!reduceMotion) {
    gsap.to("#heroCarousel", {
      y: -14,
      rotation: 2,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.utils.toArray(".float-item").forEach((el) => {
      gsap.to(el, {
        y: gsap.utils.random(-18, -34),
        rotation: gsap.utils.random(-14, 14),
        duration: gsap.utils.random(2.4, 4.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 1.5,
      });
    });

    gsap.utils.toArray(".glass-card").forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -12 : 12,
        duration: gsap.utils.random(3, 4.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    gsap.to(".blob-1", {
      x: 30,
      y: -20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".blob-2", {
      x: -20,
      y: 25,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".ring-1", {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".ring-2", {
      rotation: -360,
      duration: 80,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".stage-ring-a", {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".stage-ring-b", {
      rotation: -360,
      duration: 55,
      repeat: -1,
      ease: "none",
    });
  }

  /* -----------------------------------------------------
     4. Cursor-follow spotlight + subtle parallax
  ----------------------------------------------------- */
  const cursorGlow = document.querySelector(".cursor-glow");
  const stage = document.getElementById("stage");
  const dish = document.getElementById("heroCarousel");

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(dish, {
        x: relX * 26,
        y: relY * 18,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.utils.toArray(".float-item").forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 0.5;
        gsap.to(el, {
          x: relX * 40 * depth,
          y: relY * 30 * depth,
          duration: 1,
          ease: "power2.out",
        });
      });
    });

    stage.addEventListener("mouseleave", () => {
      gsap.to(dish, { x: 0, y: 0, duration: 1, ease: "power3.out" });
      gsap.utils.toArray(".float-item").forEach((el) => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: "power3.out" });
      });
    });
  }

  /* -----------------------------------------------------
     5. Magnetic buttons + ripple
  ----------------------------------------------------- */
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: relX * 0.28,
          y: relY * 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      });
    }

    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.4;
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.35);
        transform: scale(0); opacity: .6; z-index: 1;
      `;
      btn.appendChild(ripple);
      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    });

    // hover lift + glow already handled in CSS; add press feedback
    btn.addEventListener("mousedown", () =>
      gsap.to(btn, { scale: 0.96, duration: 0.15 }),
    );
    btn.addEventListener("mouseup", () =>
      gsap.to(btn, { scale: 1, duration: 0.2 }),
    );
  });

  /* -----------------------------------------------------
     6. Glass card hover lift (extra juice on top of CSS)
  ----------------------------------------------------- */
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        rotation: gsap.utils.random(-3, 3),
        duration: 0.3,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotation: 0, duration: 0.4, ease: "power2.out" });
    });
  });
});



// -------------------------------------


/*==========================================
PREMIUM QUICK ACTION BAR
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*============================
      ORDER TOGGLE
    ============================*/

    const buttons = document.querySelectorAll(".toggle-btn");
    const indicator = document.querySelector(".toggle-indicator");

    function moveIndicator(index){

        indicator.style.transform =
        `translateX(${index * 100}%)`;

    }

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            buttons.forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            moveIndicator(btn.dataset.index);

        });

    });



    /*============================
      DELIVERY CHECK
    ============================*/

    const input =
    document.querySelector(".input-box input");

    const checkBtn =
    document.querySelector(".check-btn");

    const result =
    document.querySelector(".delivery-result");


    const availableAreas = [

        "gulshan",
        "gulistan",
        "clifton",
        "dha",
        "nazimabad",
        "north nazimabad",
        "bahadurabad",
        "malir",
        "pechs"

    ];


    checkBtn.addEventListener("click",()=>{

        const value =
        input.value.trim().toLowerCase();

        if(value===""){

            result.style.color="#e53935";

            result.textContent=
            "Please enter your area.";

            return;

        }

        checkBtn.classList.add("loading");

        setTimeout(()=>{

            checkBtn.classList.remove("loading");

            if(availableAreas.includes(value)){

                result.style.color="#2e7d32";

                result.innerHTML=
                "✅ Great! Delivery is available.";

            }

            else{

                result.style.color="#d32f2f";

                result.innerHTML=
                "❌ Sorry, delivery isn't available yet.";

            }

        },1200);

    });



    /*============================
      OPEN / CLOSED
    ============================*/

    const dot =
    document.querySelector(".status-dot");

    const status =
    document.querySelector(".status-text");

    const hour =
    new Date().getHours();

    if(hour>=10 && hour<23){

        dot.style.background="#28c76f";

        status.textContent="Open Now";

    }

    else{

        dot.style.background="#ef4444";

        status.textContent="Closed";

    }



    /*============================
      RIPPLE EFFECT
    ============================*/

    document.querySelectorAll("button").forEach(button=>{

        button.addEventListener("click",function(e){

            const circle =
            document.createElement("span");

            const size =
            Math.max(
                this.clientWidth,
                this.clientHeight
            );

            circle.style.width=size+"px";
            circle.style.height=size+"px";

            circle.style.left=
            e.offsetX-size/2+"px";

            circle.style.top=
            e.offsetY-size/2+"px";

            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });



    /*============================
      STICKY SHADOW
    ============================*/

    const section =
    document.querySelector(".quick-action-section");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>250){

            section.classList.add("sticky");

        }

        else{

            section.classList.remove("sticky");

        }

    });

});

