"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import MainCube from "./mainCube.jsx";
import MiniCubes from "./miniCubes.jsx";

export default function Scene() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    // Cube Sizes
    const MAIN_CUBE_SCALE = 2; // default 1
    const MINI_CUBE_SCALE = 2; // default 1

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
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Main Cube
    const mainCube = MainCube();
    mainCube.scale.set(MAIN_CUBE_SCALE, MAIN_CUBE_SCALE, MAIN_CUBE_SCALE);
    scene.add(mainCube);

    const edges = new THREE.EdgesGeometry(mainCube.geometry);
    const outline = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthTest: false,
      })
    );
    outline.scale.set(1.2, 1.2, 1.2);
    mainCube.add(outline);

    // Orbiting Mini Cubes
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const miniCubes = MiniCubes(8, 3);
    miniCubes.forEach((cube) => {
      cube.scale.set(MINI_CUBE_SCALE, MINI_CUBE_SCALE, MINI_CUBE_SCALE);
      orbitGroup.add(cube);
    });

    const orbitGroup2 = new THREE.Group();
    scene.add(orbitGroup2);
    const miniCubes2 = MiniCubes(8, 2);
    miniCubes2.forEach((cube) => {
      cube.scale.set(
        MINI_CUBE_SCALE * 0.8,
        MINI_CUBE_SCALE * 0.8,
        MINI_CUBE_SCALE * 0.8
      );
      orbitGroup2.add(cube);
    });

    // Main Text
    const mainText = "ZAFFER AHMED";
    const canvasWidth = 2048;
    const canvasHeight = 512;
    const mainTextCanvas = document.createElement("canvas");
    mainTextCanvas.width = canvasWidth;
    mainTextCanvas.height = canvasHeight;
    const mainCtx = mainTextCanvas.getContext("2d");
    mainCtx.fillStyle = "white";
    mainCtx.font = "200px Impact";
    mainCtx.textAlign = "center";
    mainCtx.textBaseline = "middle";
    mainCtx.fillText(mainText, canvasWidth / 2, canvasHeight / 2);

    const mainTextTexture = new THREE.CanvasTexture(mainTextCanvas);
    mainTextTexture.needsUpdate = true;

    const planeWidth = 20;
    const planeHeight = (canvasHeight / canvasWidth) * planeWidth;
    const mainTextMaterial = new THREE.MeshBasicMaterial({
      map: mainTextTexture,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const mainTextMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(planeWidth, planeHeight),
      mainTextMaterial
    );
    mainTextMesh.position.z = 6;
    scene.add(mainTextMesh);
    gsap.to(mainTextMaterial, { opacity: 1, duration: 2 });

    // Second Text
    const messages = ["full-stack dev.", "wanna-be game dev.", "software engineer."];
    let currentMessage = 1;

    const subTextCanvas = document.createElement("canvas");
    subTextCanvas.width = canvasWidth;
    subTextCanvas.height = canvasHeight / 2; // smaller canvas
    const subCtx = subTextCanvas.getContext("2d");

    const subTextTexture = new THREE.CanvasTexture(subTextCanvas);
    subTextTexture.needsUpdate = true;

    const subTextMaterial = new THREE.MeshBasicMaterial({
      map: subTextTexture,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });

    const subPlaneWidth = planeWidth * 0.7; // smaller than main text
    const subPlaneHeight =
      (subTextCanvas.height / subTextCanvas.width) * subPlaneWidth;
    const subTextMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(subPlaneWidth, subPlaneHeight),
      subTextMaterial
    );
    subTextMesh.position.z = 5;
    subTextMesh.position.y = -planeHeight / 4; // below main text
    scene.add(subTextMesh);

    // Function to update second text
    const updateSubText = () => {
      subCtx.clearRect(0, 0, subTextCanvas.width, subTextCanvas.height);
      subCtx.fillStyle = "white";
      subCtx.font = "bold 60px Arial";
      subCtx.textAlign = "center";
      subCtx.textBaseline = "middle";
      subCtx.fillText(
        messages[currentMessage],
        subTextCanvas.width / 2,
        subTextCanvas.height / 2
      );
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
    setInterval(updateSubText, 6000); // cycle every 3 seconds

    // interactive animations
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate main cube
      mainCube.rotation.x += 0.01;
      mainCube.rotation.y += 0.01;

      // Orbit group rotation
      orbitGroup.rotation.x += 0.00002;
      orbitGroup.rotation.y += 0.00002;

      // Second orbit (opposite direction)
      orbitGroup2.rotation.x -= 0.00015;
      orbitGroup2.rotation.y -= 0.00015;

      // Mini cubes orbit dynamically
      miniCubes.forEach((cube, i) => {
        const angle =
          Date.now() * 0.001 + i * ((Math.PI * 2) / miniCubes.length);
        const radius = 8;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle) * radius;
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
      });

      miniCubes2.forEach((cube, i) => {
        const angle =
          -Date.now() * 0.001 + i * ((Math.PI * 3) / miniCubes2.length); // negative for opposite
        const radius = 10; // slightly further out
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle) * radius;
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
      });

      // Raycasting for hover interactions
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([mainCube, ...miniCubes]);

      // Reset cubes
      miniCubes.forEach((cube) => {
        gsap.to(cube.scale, {
          x: MINI_CUBE_SCALE,
          y: MINI_CUBE_SCALE,
          z: MINI_CUBE_SCALE,
          duration: 0.1,
        });
        cube.material.emissive = new THREE.Color(0x000000);
      });
      gsap.to(mainCube.scale, {
        x: MAIN_CUBE_SCALE,
        y: MAIN_CUBE_SCALE,
        z: MAIN_CUBE_SCALE,
        duration: 0.1,
      });
      mainCube.material.emissive = new THREE.Color(0x000000);

      // Pulse outline
      const outlineScale = 1.2 + Math.sin(Date.now() * 0.005) * 0.03;
      outline.scale.set(outlineScale, outlineScale, outlineScale);

      // Apply hover effects
      intersects.forEach((hit) => {
        const obj = hit.object;
        if (miniCubes.includes(obj)) {
          gsap.to(obj.scale, {
            x: MINI_CUBE_SCALE * 1.4,
            y: MINI_CUBE_SCALE * 1.4,
            z: MINI_CUBE_SCALE * 1.4,
            duration: 0.3,
          });
          obj.material.emissive = new THREE.Color(0xff3366);
          obj.material.emissiveIntensity = 0.7;
        } else if (obj === mainCube) {
          gsap.to(mainCube.scale, {
            x: MAIN_CUBE_SCALE * 1.3,
            y: MAIN_CUBE_SCALE * 1.3,
            z: MAIN_CUBE_SCALE * 1.3,
            duration: 0.3,
          });
          mainCube.material.emissive = new THREE.Color(0xffffff);
          mainCube.material.emissiveIntensity = 0.7;
          gsap.to(outline.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 0.3 });
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
