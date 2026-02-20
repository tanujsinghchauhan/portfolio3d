import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadModel(scene, camera) {
  // 1. Get UI Elements
  const bootText = document.getElementById("boot-text");
  const progressBar = document.getElementById("progress-bar");
  const enterBtn = document.getElementById("enter-btn");
  const loadingScreen = document.getElementById("loading-screen");

  // 2. Setup Loading Manager
  const manager = new THREE.LoadingManager();

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
    bootText.innerText = `DECRYPTING_SECTOR: ${Math.round(progress)}%`;
  };

  manager.onLoad = () => {
    bootText.innerHTML = "SYSTEM_READY.<br>VIRTUAL_ENVIRONMENT_STABILIZED.";
    if (enterBtn) {
      enterBtn.style.display = "block";
      enterBtn.classList.add("crt-active");
    }
  };

  // 3. Handle Exit Logic
  if (enterBtn) {
    enterBtn.onclick = () => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.remove();
      }, 1200);
    };
  }

  // 4. Load Model using Manager
  const loader = new GLTFLoader(manager);

  loader.load("/scene.glb", (gltf) => {
    const model = gltf.scene;
    model.scale.set(15, 15, 15);

    // Centering Logic
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.position.y += 1;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(model);

    // Camera Auto-Positioning
    const size = box.getSize(new THREE.Vector3()).length();
    const distance = size * 0.8;

    camera.position.set(distance, distance * 0.6, distance);
    camera.lookAt(0, 1, 0);

    // 5. CAPTURE INITIAL STATE (Now that camera is positioned)
    window.initialCameraPosition = camera.position.clone();
    window.initialCameraTarget = new THREE.Vector3(0, 1, 0);
  });
}
