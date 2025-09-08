import Lenis from "@studio-freight/lenis";

export default function lenis() {
  const lenis = new Lenis({
    duration: 1.2, // higher = smoother
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // debugging
  lenis.on("scroll", (e) => console.log("scrolling", e));
}
