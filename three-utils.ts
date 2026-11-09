import * as THREE from "three";

/** Cinematic lighting rig: key spotlight + gold rim + cool fill + ambient */
export function setupLighting(scene: THREE.Scene) {
  const key = new THREE.SpotLight(0xfff2dd, 180, 40, Math.PI / 4.5, 0.45, 1.1);
  key.position.set(4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0004;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xd4af37, 3.2);
  rim.position.set(-6, 4, -5);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x7aa2ff, 1.1);
  fill.position.set(-4, 2, 6);
  scene.add(fill);

  const top = new THREE.PointLight(0xffffff, 30, 20, 1.5);
  top.position.set(0, 5, 0);
  scene.add(top);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
}

/** Shared luxury materials */
export const MAT = {
  gold: () =>
    new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 1,
      roughness: 0.22,
    }),
  roseGold: () =>
    new THREE.MeshStandardMaterial({
      color: 0xb76e79,
      metalness: 1,
      roughness: 0.28,
    }),
  blackMetal: () =>
    new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.9,
      roughness: 0.32,
    }),
  chrome: () =>
    new THREE.MeshStandardMaterial({
      color: 0xe8e8ec,
      metalness: 1,
      roughness: 0.08,
    }),
  leather: (c = 0x5a2d1a) =>
    new THREE.MeshStandardMaterial({
      color: c,
      roughness: 0.55,
      metalness: 0.05,
    }),
  fabric: (c = 0x222226) =>
    new THREE.MeshStandardMaterial({ color: c, roughness: 0.92, metalness: 0 }),
  glass: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 1,
      thickness: 0.6,
      roughness: 0.06,
      ior: 1.5,
      transparent: true,
    }),
  mirror: (c = 0xd4af37) =>
    new THREE.MeshPhysicalMaterial({
      color: c,
      metalness: 1,
      roughness: 0.03,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
};

/** Floating display pedestal with gold ring */
export function makePedestal(radius = 1.15, height = 0.16) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 1.18, height, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.28,
      metalness: 0.65,
    })
  );
  base.receiveShadow = true;
  base.castShadow = true;
  g.add(base);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.03, 0.018, 16, 120),
    MAT.gold()
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = height / 2;
  g.add(ring);

  const glow = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, 0.012, 64),
    new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.14,
    })
  );
  glow.position.y = height / 2 + 0.004;
  g.add(glow);

  return g;
}

/** Golden dust particle field */
export function makeParticles(
  count = 260,
  spread = 9,
  height = 4.5,
  color = 0xd4af37
) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = Math.random() * height;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    speed[i] = 0.05 + Math.random() * 0.18;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.speed = speed;
  return points;
}

/** Animate particles floating upward */
export function tickParticles(points: THREE.Points, dt: number) {
  const pos = points.geometry.attributes.position as THREE.BufferAttribute;
  const speed = points.userData.speed as Float32Array;
  for (let i = 0; i < pos.count; i++) {
    let y = pos.getY(i) + speed[i] * dt;
    if (y > 4.6) y = 0;
    pos.setY(i, y);
    pos.setX(i, pos.getX(i) + Math.sin(y * 2 + i) * 0.0006);
  }
  pos.needsUpdate = true;
}

/** Soft contact shadow disc */
export function makeShadowDisc(radius = 1.2) {
  const geo = new THREE.CircleGeometry(radius, 48);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.45,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.005;
  return mesh;
}
