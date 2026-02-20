import * as THREE from "three";

export function focusCamera(camera, controls, object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();

  // target camera position
  const direction = new THREE.Vector3();
  direction.subVectors(camera.position, center).normalize();

  const newPosition = center.clone().add(direction.multiplyScalar(size * 1.5));

  animateCamera(camera, controls, newPosition, center);
}

function animateCamera(camera, controls, newPos, target) {
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();

  let t = 0;

  function move() {
    t += 0.02;

    camera.position.lerpVectors(startPos, newPos, t);
    controls.target.lerpVectors(startTarget, target, t);

    if (t < 1) {
      requestAnimationFrame(move);
    }
  }

  move();
}
