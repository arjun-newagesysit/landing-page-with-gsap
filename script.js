window.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	if (ScrollSmoother.get()) ScrollSmoother.get().kill();

	ScrollSmoother.create({
		wrapper: "#smooth-wrapper",
		content: "#smooth-content",
		smooth: 1,
		effects: true,
	});

	gsap.to(".hero-title", {
		yPercent: -10,
		ease: "none",
		scrollTrigger: {
			trigger: ".hero-title",
			scrub: true,
		},
	});
	gsap.to("svg.circles", {
		yPercent: 10,
		ease: "none",
		scrollTrigger: {
			trigger: "main.page-bg",
			start: "top bottom",
			end: "bottom top",
			scrub: 0.8,
		},
	});

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
		}),
	);
	btn.addEventListener("mouseleave", () =>
		gsap.to(btn, {
			scale: 1,
			boxShadow: "0 0 0 rgba(255,91,20,0)",
			duration: 0.3,
		}),
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

	const chars = document.querySelectorAll(".char");
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".sliding-text-container",
			start: "top 85%",
			end: "bottom 60%",
			scrub: 1.2,
		},
	});

	tl.fromTo(
		chars,
		{
			opacity: 0.1,
			y: 10,
			filter: "blur(4px)",
		},
		{
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			color: "#ffffff",
			ease: "power4.out",
			stagger: {
				each: 0.015,
				from: "start",
			},
			onUpdate: () => {
				chars.forEach((span) => {
					span.style.webkitTextFillColor = "#fff";
				});
			},
		},
	);

	/**
	 * Testimonial section
	 */
	gsap.registerPlugin(ScrollTrigger);
	gsap.from("h2.testimonial-title", {
		y: 30,
		opacity: 0,
		duration: 0.75,
		delay: 1,
		ease: "power3.out",
		scrollTrigger: {
			trigger: "h2.testimonial-title",
			start: "top 85%",
			toggleActions: "play none none reverse",
		},
	});

	gsap.registerPlugin(ScrollTrigger);
	gsap.utils.toArray(".testimonial-grid > div").forEach((col, i) => {
		gsap.from(col.querySelectorAll(".testimonial-card"), {
			y: 40,
			opacity: 0,
			duration: 1,
			ease: "power3.out",
			stagger: 0.25,
			delay: i * 0.5,
			scrollTrigger: {
				trigger: col,
				start: "top 85%",
				toggleActions: "play none none reverse",
			},
		});
	});
	document.querySelectorAll(".testimonial-card").forEach((card) => {
		const hoverAnim = gsap.to(card, {
			y: -5,
			scale: 1.02,
			boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
			duration: 0.4,
			ease: "power2.out",
			paused: true,
		});

		const innerCircle = card.querySelector(".inner-circle");
		const glowAnim = innerCircle
			? gsap.to(innerCircle, {
					opacity: 0.7,
					filter: "blur(30px)",
					duration: 0.5,
					ease: "power2.out",
					paused: true,
				})
			: null;

		card.addEventListener("mouseenter", () => {
			hoverAnim.play();
			glowAnim?.play();
		});

		card.addEventListener("mouseleave", () => {
			hoverAnim.reverse();
			glowAnim?.reverse();
		});
	});
});
