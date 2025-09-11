import * as THREE from "three";

export default function MiniCubes(count = 6, radius = 3) {
  const cubes = [];
  for (let i = 0; i < count; i++) {
    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshStandardMaterial({ color: "#ff9633ff" });
    const cube = new THREE.Mesh(geometry, material);

    const angle = (i / count) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * radius;
    cube.position.y = Math.sin(angle) * radius;

    cubes.push(cube);
  }
  return cubes;
}
