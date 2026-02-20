import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function addControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 4;
  controls.maxDistance = 30;
  controls.maxPolarAngle = Math.PI / 2.1;

  return controls;
}
