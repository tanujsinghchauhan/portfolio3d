import * as THREE from "three";

export function addLighting(scene) {
  // 1. MURKY AMBIENT
  // Slightly darker than before to allow shadows to be "true" black in corners
  const ambient = new THREE.AmbientLight(0x2d3b2d, 0.5);
  scene.add(ambient);

  // 2. THE OVERHEAD "SICKLY" LIGHT (Increased Intensity)
  // Positioned high and slightly to the right to match the reference floor reflection
  const overheadLight = new THREE.PointLight(0xd9ff8a, 2500);
  overheadLight.position.set(4, 5, 4);
  overheadLight.distance = 60;
  overheadLight.decay = 2;
  overheadLight.castShadow = true;

  // High-quality soft shadows
  overheadLight.shadow.mapSize.set(2048, 2048);
  overheadLight.shadow.radius = 6;
  overheadLight.shadow.bias = -0.0001;
  scene.add(overheadLight);

  // 3. THE FLOOR REFLECTION (Point Light)
  // This simulates the "hot spot" on the shiny tiles
  const floorGlow = new THREE.PointLight(0xfff9c4, 800);
  floorGlow.position.set(3, 0.1, 5); // Very close to the floor
  floorGlow.distance = 7;
  scene.add(floorGlow);

  // 4. THE WINDOW "RIM" LIGHT
  // A cool blue light coming from the window side to hit the edges of the cabinet
  const windowRim = new THREE.SpotLight(0x94b0af, 1500);
  windowRim.position.set(-8, 4, 2);
  windowRim.target.position.set(2, 0, 2); // Aimed across the room
  windowRim.angle = Math.PI / 6;
  windowRim.penumbra = 0.8;
  scene.add(windowRim);
  scene.add(windowRim.target);
}
