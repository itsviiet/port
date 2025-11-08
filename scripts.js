const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const observedElements = document.querySelectorAll("[data-observe]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateHeaderState() {
  if (!header) return;
  const scrolled = window.scrollY > 8;
  header.classList.toggle("is-scrolled", scrolled);
}

function toggleNavigation() {
  if (!nav || !navToggle) return;
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  nav.classList.toggle("is-open", !isExpanded);
  if (!isExpanded) {
    nav.querySelector("a")?.focus({ preventScroll: true });
  }
}

function closeNavigation() {
  if (!nav || !navToggle) return;
  navToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

function initNavigation() {
  if (!navToggle) return;
  navToggle.addEventListener("click", toggleNavigation);
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNavigation();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNavigation();
    }
  });
}

function initObservers() {
  if (prefersReducedMotion.matches) {
    observedElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  observedElements.forEach((el) => observer.observe(el));
}

function initCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderState();
  initNavigation();
  initObservers();
  initCurrentYear();
});

