import { gsap } from "gsap";

export function spinCube(selector = ".cube") {
  const cube = document.querySelector(selector);
  if (!cube) return;

  gsap.to(cube, {
    rotateY: "+=360",
    rotateX: "+=360",
    duration: 10,
    repeat: -1,
    ease: "linear"
  });
}
