// ---------- Footer year ----------
// Keeps the © year current without editing it every January.
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Slide-in animations ----------
// Any element with class="reveal" starts hidden (see the .js .reveal rule
// in style.css) and slides up into place the first time it scrolls into view.

// Inside a class="stagger" group, each child waits a little longer than
// the one before it, so cards and hero items arrive one after another.
document.querySelectorAll(".stagger").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.style.setProperty("--delay", `${i * 100}ms`);
  });
});

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  // No animation: just show everything.
  revealItems.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once, then stop watching
        }
      });
    },
    // Trigger when ~15% of the element is on screen, slightly before the bottom edge
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((el) => observer.observe(el));
}
