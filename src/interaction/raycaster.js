import * as THREE from "three";
const INTERACTIVE_OBJECTS = [
  "taperecorder",
  "Monitor",
  "poster1",
  "poster2",
  "skills",
  "cabinet1",
  "cabinet2",
  "cabinet3",
  "Cabinet4",
  "Cabinet5",
  "Cabinet6",
  "Cabinet7",
  "Cabinet8",
  "Cabinet9",
  "Cabinet10",
  "Cabinet11",
  "Cabinet12",
  "photo2",
  "photo6",
  "photo",
  "tablecabinet1",
  "tablecabinet2",
  "fileholder2",
  "tv",
  "fileholder",
  "fileholder3",
  "technology",
  "Plane149",
  "Plane150",
  "Plane155",
  "Plane167",
];
export function setupRaycaster(scene, camera, onObjectClick) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;

      console.log("Clicked:", clicked.name);

      const isInteractive = INTERACTIVE_OBJECTS.some((name) =>
        clicked.name.includes(name),
      );

      if (!isInteractive) return;

      onObjectClick(clicked.name, clicked);
    }
  });
}
