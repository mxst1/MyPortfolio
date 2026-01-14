import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- 1. SETUP ---
    // Get the parent size immediately
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight || 400; // Fallback if parent has no height

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002); // Dark fog matches background

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas, // Connect to the specific canvas ref
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. ASSETS (Programmatic Glow) ---
    const getGlowTexture = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "#aa7dce");
      gradient.addColorStop(0.6, "rgba(20,20,80,0.1)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(c);
    };

    const spriteMaterial = new THREE.SpriteMaterial({
      map: getGlowTexture(),
      color: 0xaa7dce,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });

    // --- 3. CREATE NEURONS ---
    const group = new THREE.Group();
    scene.add(group);
    const neurons = [];

    for (let i = 0; i < 200; i++) {
      const sprite = new THREE.Sprite(spriteMaterial.clone());
      const radius = 8 + Math.random() * 4;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      sprite.position.setFromSphericalCoords(radius, theta, phi);
      sprite.scale.setScalar(0.5 + Math.random() * 0.5);
      
      sprite.userData = { neighbors: [], originalScale: sprite.scale.x, flash: 0 };
      neurons.push(sprite);
      group.add(sprite);
    }

    // --- 4. CONNECT NEURONS ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xaa7dce,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    neurons.forEach((n1) => {
      neurons.forEach((n2) => {
        if (n1 === n2) return;
        if (n1.position.distanceTo(n2.position) < 4) {
          n1.userData.neighbors.push(n2);
          const geo = new THREE.BufferGeometry().setFromPoints([n1.position, n2.position]);
          group.add(new THREE.Line(geo, lineMaterial));
        }
      });
    });

    // --- 5. SIGNALS ---
    const signals = [];
    const signalGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const signalMat = new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending });

    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(signalGeo, signalMat);
      s.visible = false; // Start hidden
      group.add(s);
      signals.push({ mesh: s, active: false, progress: 0, source: null, target: null });
    }

    // --- 6. ANIMATION ---
    const animate = () => {
      group.rotation.y += 0.0015; // Gentle rotation
      
      // Activate random signals
      signals.forEach(s => {
        if (!s.active && Math.random() < 0.02) {
          const start = neurons[Math.floor(Math.random() * neurons.length)];
          if (start.userData.neighbors.length > 0) {
            s.active = true;
            s.source = start;
            s.target = start.userData.neighbors[Math.floor(Math.random() * start.userData.neighbors.length)];
            s.progress = 0;
            s.mesh.visible = true;
          }
        }
        
        if (s.active) {
          s.progress += 0.03;
          s.mesh.position.lerpVectors(s.source.position, s.target.position, s.progress);
          if (s.progress >= 1) {
            s.target.userData.flash = 1.0; // Flash effect
            s.active = false;
            s.mesh.visible = false;
          }
        }
      });

      // Flash decay
      neurons.forEach(n => {
        if (n.userData.flash > 0) {
          n.userData.flash -= 0.05;
          const s = n.userData.originalScale * (1 + n.userData.flash);
          n.scale.setScalar(s);
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const reqId = requestAnimationFrame(animate);

    // --- 7. RESIZE ---
    const handleResize = () => {
       if (canvas.parentElement) {
          const w = canvas.parentElement.clientWidth;
          const h = canvas.parentElement.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
       }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      // Clean up scene to prevent memory leaks
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "#171717",
        position: "relative",
        top: "-30px",
        left: "-30px",
      }}
    />
  );
}