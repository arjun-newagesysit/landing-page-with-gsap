window.addEventListener("DOMContentLoaded", () => {
  /**
   * Hero animation
   */
  gsap.from("h1.hero-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });
  gsap.from("p.sub-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.75,
    ease: "power3.out",
  });
  gsap.from("li", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power3.out",
  });
  gsap.from("p.footer-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power3.out",
  });
  gsap.from(".estimate-btn", {
    y: 30,
    opacity: 0,
    duration: 0.75,
    delay: 1,
    ease: "power3.out",
  });

  const btn = document.querySelector(".estimate-btn");
  btn.addEventListener("mouseenter", () =>
    gsap.to(btn, {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255,91,20,0.6)",
      duration: 0.3,
    })
  );
  btn.addEventListener("mouseleave", () =>
    gsap.to(btn, {
      scale: 1,
      boxShadow: "0 0 0 rgba(255,91,20,0)",
      duration: 0.3,
    })
  );

  const circles = gsap.utils.toArray("svg circle");
  gsap.set(circles, { scale: 0, transformOrigin: "center center" });

  gsap.to(circles, {
    scale: 1,
    duration: 1.2,
    ease: "back.out(1.7)",
    stagger: 0.2,
  });

  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener("mousemove", (e) => {
    const dx = (e.clientX - center.x) / center.x;
    const dy = (e.clientY - center.y) / center.y;

    circles.forEach((circle, i) => {
      const depth = (i + 1) / circles.length;
      const moveX = dx * 15 * (1 - depth);
      const moveY = dy * 15 * (1 - depth);

      gsap.to(circle, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  });

  /**
   * Sliding text
   */
  gsap.registerPlugin(ScrollTrigger);

  const text = document.querySelector(".sliding-text");
  const content = text.textContent.trim();
  text.textContent = "";

  content.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("char");
    text.appendChild(span);
  });

  gsap.to(".char", {
    scrollTrigger: {
      trigger: ".sliding-text-container",
      start: "top 80%",
      end: "bottom 60%",
      scrub: true,
    },
    opacity: 1,
    color: "#fff",
    ease: "power2.out",
    stagger: 0.02,
    onUpdate: () => {
      document.querySelectorAll(".char").forEach((span) => {
        span.style.webkitTextFillColor = "#fff";
      });
    },
  });

  gsap.to(".char", {
    scrollTrigger: {
      trigger: ".sliding-text-container",
      start: "top 80%",
      end: "bottom 60%",
      scrub: true,
    },
    opacity: 1,
    y: -10,
    color: "#fff",
    ease: "power2.out",
    stagger: 0.02,
  });

  /**
   * Testimonial section
   */
  gsap.from("h2.testimonial-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });
});
