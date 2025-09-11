import * as THREE from "three";

export default function MainCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: "#b6433c" });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
