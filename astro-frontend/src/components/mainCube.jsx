import * as THREE from "three";

export default function MainCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({color: "#222221"});
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
