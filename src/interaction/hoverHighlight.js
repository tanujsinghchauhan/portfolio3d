import * as THREE from "three";

const INTERACTIVE_OBJECTS = [
  "taperecorder",
  "Monitor",
  "poster1",
  "poster2",
  "skills",
  "Cabinet1",
  "Cabinet2",
  "Cabinet3",
  "Cabinet4",
  "Cabinet5",
  "Cabinet6",
  "Cabinet7",
  "Cabinet8",
  "Cabinet9",
  "Cabinet10",
  "Cabinet11",
  "Cabinet12",
  "tv",
  "fileholder",
  "fileholder2",
  "fileholder3",
  "technology",
];

export function setupHover(scene, camera, renderer) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentObject = null;

  // Clock for the pulse timing
  const clock = new THREE.Clock();

  renderer.domElement.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      const isInteractive = INTERACTIVE_OBJECTS.some((name) =>
        hovered.name.includes(name),
      );

      if (isInteractive) {
        if (currentObject !== hovered) {
          resetObject(currentObject);
          currentObject = hovered;
          renderer.domElement.style.cursor = "crosshair";
        }
      } else {
        resetObject(currentObject);
        currentObject = null;
      }
    } else {
      resetObject(currentObject);
      currentObject = null;
    }
  });

  function resetObject(obj) {
    if (obj && obj.material && obj.material.emissive) {
      obj.material.emissive.set(0x000000);
      renderer.domElement.style.cursor = "default";
    }
  }

  function animatePulse() {
    requestAnimationFrame(animatePulse);
    if (
      currentObject &&
      currentObject.material &&
      currentObject.material.emissive
    ) {
      // Sine wave for smooth blinking
      // Speed (6) and Intensity (0.4)
      const intensity = (Math.sin(clock.getElapsedTime() * 6) + 1) * 0.4;

      // Setting the emissive color to #F56527 (R: 245, G: 101, B: 39)
      // We normalize these values (0-1) for Three.js
      currentObject.material.emissive.setRGB(
        (245 / 255) * intensity,
        (101 / 255) * intensity,
        (39 / 255) * intensity,
      );
    }
  }

  animatePulse();
}
