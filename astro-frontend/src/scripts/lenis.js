import Lenis from "@studio-freight/lenis";

const projectsContainer = document.querySelector("#projects");

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wrapper: projectsContainer, // container to scroll
  content: projectsContainer.querySelector(".scrollable"),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
