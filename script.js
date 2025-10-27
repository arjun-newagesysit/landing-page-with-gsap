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

  // CTA hover glow
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

  /**
   * Sliding text
   */
  gsap.registerPlugin(SplitText, ScrollTrigger);
  let split, tl;
  const createSplit = () => {
    split && split.revert();
    tl && tl.revert();
    split = new SplitText(".sliding-text-container h2", {
      type: "chars",
    });

    tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: "#textSection",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.75,
          markers: true,
        },
      })
      .set(
        split.chars,
        {
          color: "#fff",
          stagger: 0.1,
        },
        0.1
      );
  };
  createSplit();
  const debouncer = gsap.delayedCall(0.2, createSplit).pause();

  window.addEventListener("resize", () => debouncer.restart(true));
});
