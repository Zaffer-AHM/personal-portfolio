"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import MainCube from "./mainCube.jsx";

export default function Scene() {
  const containerRef = useRef();

  // Boolean flag to toggle main cube
  const SHOW_MAIN_CUBE = false;

  useEffect(() => {
    const container = containerRef.current;

    // Cube settings
    const MAIN_CUBE_SCALE = 2;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight("#ffffff", 1));

    let mainCube, outline;

    if (SHOW_MAIN_CUBE) {
      // Main Cube
      mainCube = MainCube();
      mainCube.scale.set(MAIN_CUBE_SCALE, MAIN_CUBE_SCALE, MAIN_CUBE_SCALE);
      scene.add(mainCube);

      // Cube outline (glow effect)
      const edges = new THREE.EdgesGeometry(mainCube.geometry);
      outline = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: "#ffffff",
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthTest: false,
        })
      );
      outline.scale.set(1.2, 1.2, 1.2);
      mainCube.add(outline);
    }

    // Main text
    const mainText = "ZAFFER AHMED";
    const canvasWidth = 2048;
    const canvasHeight = 512;
    const mainTextCanvas = document.createElement("canvas");
    mainTextCanvas.width = canvasWidth;
    mainTextCanvas.height = canvasHeight;
    const mainCtx = mainTextCanvas.getContext("2d");
    mainCtx.fillStyle = "white";
    mainCtx.font = `200px Impact`;
    mainCtx.textAlign = "center";
    mainCtx.textBaseline = "middle";
    mainCtx.fillText(mainText, canvasWidth / 2, canvasHeight / 2);

    const mainTextTexture = new THREE.CanvasTexture(mainTextCanvas);
    const mainTextMaterial = new THREE.MeshBasicMaterial({
      map: mainTextTexture,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    let mainTextMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(20, (canvasHeight / canvasWidth) * 20),
      mainTextMaterial
    );
    mainTextMesh.position.z = 6;
    scene.add(mainTextMesh);
    gsap.to(mainTextMaterial, { opacity: 1, duration: 2 });

    // Subtext
    const messages = [
      "full-stack dev.",
      "java user.",
      "software engineer.",
      "click top right to navigate faster.",
    ];
    let currentMessage = 0;

    const subTextCanvas = document.createElement("canvas");
    subTextCanvas.width = canvasWidth;
    subTextCanvas.height = canvasHeight / 2;
    const subCtx = subTextCanvas.getContext("2d");

    const subTextTexture = new THREE.CanvasTexture(subTextCanvas);
    const subTextMaterial = new THREE.MeshBasicMaterial({
      map: subTextTexture,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    let subTextMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(14, (subTextCanvas.height / subTextCanvas.width) * 14),
      subTextMaterial
    );
    subTextMesh.position.z = 5;
    subTextMesh.position.y = -(canvasHeight / canvasWidth) * 20 / 4;
    scene.add(subTextMesh);

    const updateSubText = () => {
      subCtx.clearRect(0, 0, subTextCanvas.width, subTextCanvas.height);
      subCtx.fillStyle = "white";
      subCtx.font = "bold 60px Arial";
      subCtx.textAlign = "center";
      subCtx.textBaseline = "middle";
      subCtx.fillText(messages[currentMessage], subTextCanvas.width / 2, subTextCanvas.height / 2);
      subTextTexture.needsUpdate = true;

      gsap.fromTo(
        subTextMaterial,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            gsap.to(subTextMaterial, { opacity: 0, duration: 1, delay: 2 });
          },
        }
      );

      currentMessage = (currentMessage + 1) % messages.length;
    };

    updateSubText();
    setInterval(updateSubText, 6000);

    // Responsive text planes
    const resizeTextMeshes = () => {
      const planeWidth = window.innerWidth / 100;
      const planeHeight = (canvasHeight / canvasWidth) * planeWidth;
      mainTextMesh.geometry.dispose();
      mainTextMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

      const subPlaneWidth = planeWidth * 0.7;
      const subPlaneHeight = (subTextCanvas.height / subTextCanvas.width) * subPlaneWidth;
      subTextMesh.geometry.dispose();
      subTextMesh.geometry = new THREE.PlaneGeometry(subPlaneWidth, subPlaneHeight);

      subTextMesh.position.y = -planeHeight / 4;
    };

    resizeTextMeshes();

    // Mouse hover interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      if (SHOW_MAIN_CUBE) {
        // Rotate cube
        mainCube.rotation.x += 0.01;
        mainCube.rotation.y += 0.01;

        // Pulse outline
        const outlineScale = 1.2 + Math.sin(Date.now() * 0.005) * 0.03;
        outline.scale.set(outlineScale, outlineScale, outlineScale);

        // Raycast hover effect
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(mainCube);

        if (intersects.length > 0) {
          gsap.to(mainCube.scale, {
            x: MAIN_CUBE_SCALE * 1.3,
            y: MAIN_CUBE_SCALE * 1.3,
            z: MAIN_CUBE_SCALE * 1.3,
            duration: 0.3,
          });
          mainCube.material.emissive = new THREE.Color("#222221");
          mainCube.material.emissiveIntensity = 0.7;
          gsap.to(outline.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 0.3 });
        } else {
          gsap.to(mainCube.scale, {
            x: MAIN_CUBE_SCALE,
            y: MAIN_CUBE_SCALE,
            z: MAIN_CUBE_SCALE,
            duration: 0.3,
          });
          mainCube.material.emissive = new THREE.Color("#000000");
          gsap.to(outline.scale, {
            x: outlineScale,
            y: outlineScale,
            z: outlineScale,
            duration: 0.3,
          });
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Responsive text
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      resizeTextMeshes();
    });
  }, []);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
