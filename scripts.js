document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const navToggle = document.querySelector("[data-behavior='nav-toggle']");
  const backToTop = document.querySelector("[data-behavior='back-to-top']");
  const yearTarget = document.querySelector("[data-year]");

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
  }

  const setNavState = (isOpen) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const currentlyExpanded = navToggle.getAttribute("aria-expanded") === "true";
      setNavState(!currentlyExpanded);
    });

    nav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setNavState(false);
      }
    });
  }

  const handleScroll = () => {
    const offset = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      header.classList.toggle("is-condensed", offset > 16);
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", offset > 480);
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  }

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const headerOffset = header ? Math.min(header.offsetHeight + 12, 120) : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  });

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (revealTargets.length) {
    if (prefersReducedMotion()) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
      );

      revealTargets.forEach((element) => observer.observe(element));
    }
  }
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
