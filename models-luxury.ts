import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { MAT } from "./three-utils";

/** Glass perfume bottle with amber liquid and gold cap */
export function buildPerfume(group: THREE.Group, liquidColor = 0xd98a2b) {
  const g = new THREE.Group();
  const glass = MAT.glass();
  const gold = MAT.gold();

  const pts = [
    new THREE.Vector2(0.001, 0),
    new THREE.Vector2(0.3, 0),
    new THREE.Vector2(0.34, 0.04),
    new THREE.Vector2(0.34, 0.55),
    new THREE.Vector2(0.28, 0.72),
    new THREE.Vector2(0.13, 0.8),
    new THREE.Vector2(0.12, 0.86),
  ];
  const bottle = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), glass);
  bottle.castShadow = true;
  g.add(bottle);

  const liquidPts = pts.map(
    (p) => new THREE.Vector2(Math.max(0.001, p.x * 0.88), p.y * 0.92)
  );
  const liquid = new THREE.Mesh(
    new THREE.LatheGeometry(liquidPts, 48),
    new THREE.MeshPhysicalMaterial({
      color: liquidColor,
      roughness: 0.1,
      transmission: 0.35,
      thickness: 1,
      transparent: true,
      opacity: 0.94,
    })
  );
  g.add(liquid);

  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.135, 0.135, 0.05, 32),
    gold
  );
  band.position.y = 0.88;
  g.add(band);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, 0.22, 32),
    gold
  );
  cap.position.y = 1.0;
  cap.castShadow = true;
  g.add(cap);
  const capTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.115, 0.115, 0.02, 32),
    MAT.blackMetal()
  );
  capTop.position.y = 1.12;
  g.add(capTop);

  // Label
  const label = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.26, 0.012),
    new THREE.MeshStandardMaterial({ color: 0xf5efe0, roughness: 0.6 })
  );
  label.position.set(0, 0.38, 0.345);
  g.add(label);
  const labelLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.02, 0.014),
    gold
  );
  labelLine.position.set(0, 0.44, 0.346);
  g.add(labelLine);
  const labelLine2 = labelLine.clone();
  labelLine2.position.y = 0.38;
  g.add(labelLine2);

  group.add(g);
  return g;
}

/** Leather handbag with handles, gold clasp and chain */
export function buildBag(group: THREE.Group, color = 0x3a1f14) {
  const g = new THREE.Group();
  const leather = MAT.leather(color);
  const gold = MAT.gold();

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(1.15, 0.8, 0.38, 4, 0.08),
    leather
  );
  body.position.y = 0.45;
  body.castShadow = true;
  g.add(body);

  const flap = new THREE.Mesh(
    new RoundedBoxGeometry(1.17, 0.42, 0.4, 4, 0.08),
    leather
  );
  flap.position.y = 0.68;
  g.add(flap);

  const handleGeo = new THREE.TorusGeometry(0.26, 0.03, 12, 32, Math.PI);
  const h1 = new THREE.Mesh(handleGeo, leather);
  h1.position.set(-0.28, 0.85, 0);
  const h2 = h1.clone();
  h2.position.x = 0.28;
  g.add(h1, h2);

  for (const x of [-0.28, 0.28]) {
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.42), gold);
    mount.position.set(x, 0.86, 0);
    g.add(mount);
  }

  const clasp = new THREE.Mesh(
    new RoundedBoxGeometry(0.16, 0.1, 0.05, 2, 0.02),
    gold
  );
  clasp.position.set(0, 0.5, 0.21);
  g.add(clasp);

  const chain = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.012, 8, 48, Math.PI),
    gold
  );
  chain.position.set(0, 0.85, 0);
  chain.scale.set(1, 1.4, 1);
  g.add(chain);

  for (const x of [-0.45, 0.45]) {
    const stud = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), gold);
    stud.position.set(x, 0.06, 0.12);
    g.add(stud);
    const stud2 = stud.clone();
    stud2.position.z = -0.12;
    g.add(stud2);
  }

  const stitch = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.012, 0.012),
    new THREE.MeshStandardMaterial({ color: 0xd8c9a3, roughness: 0.8 })
  );
  stitch.position.set(0, 0.2, 0.195);
  g.add(stitch);

  g.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  group.add(g);
  return g;
}

/** Luxury watch with live real-time hands and canvas dial */
export function buildWatch(group: THREE.Group) {
  const g = new THREE.Group();
  const gold = MAT.gold();
  const leather = MAT.leather(0x2a1a12);

  const caseMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 0.14, 48),
    gold
  );
  caseMesh.rotation.x = Math.PI / 2;
  caseMesh.castShadow = true;
  g.add(caseMesh);

  const bezel = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.035, 16, 48),
    gold
  );
  g.add(bezel);

  // Dial texture drawn on canvas
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0d0d10";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#d4af37";
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const long = i % 5 === 0;
    ctx.lineWidth = long ? 6 : 2;
    ctx.beginPath();
    ctx.moveTo(
      256 + Math.cos(a) * (long ? 200 : 215),
      256 + Math.sin(a) * (long ? 200 : 215)
    );
    ctx.lineTo(256 + Math.cos(a) * 232, 256 + Math.sin(a) * 232);
    ctx.stroke();
  }
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 44px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("NEXX JEANS", 256, 190);
  ctx.font = "24px Georgia";
  ctx.fillText("LUXURY", 256, 340);
  const dialTex = new THREE.CanvasTexture(canvas);
  dialTex.colorSpace = THREE.SRGBColorSpace;
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(0.36, 48),
    new THREE.MeshStandardMaterial({
      map: dialTex,
      roughness: 0.35,
      metalness: 0.3,
    })
  );
  dial.position.z = 0.075;
  g.add(dial);

  // Hands
  const handMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 1,
    roughness: 0.2,
  });
  function hand(len: number, w: number, mat: THREE.Material) {
    const geo = new THREE.BoxGeometry(w, len, 0.008);
    geo.translate(0, len / 2 - 0.03, 0);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = 0.085;
    return mesh;
  }
  const hourHand = hand(0.18, 0.03, handMat);
  const minHand = hand(0.27, 0.022, handMat);
  const secHand = hand(
    0.3,
    0.008,
    new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.4 })
  );
  g.add(hourHand, minHand, secHand);
  const pin = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 16), gold);
  pin.position.z = 0.09;
  g.add(pin);

  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.05, 16),
    gold
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.set(0.45, 0, 0);
  g.add(crown);

  const bandTop = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.09, 12, 32, Math.PI * 0.7),
    leather
  );
  bandTop.position.y = 0.55;
  bandTop.rotation.z = Math.PI * 0.15;
  bandTop.scale.set(0.7, 1, 0.5);
  g.add(bandTop);
  const bandBottom = bandTop.clone();
  bandBottom.position.y = -0.55;
  bandBottom.rotation.z = Math.PI * 1.15;
  g.add(bandBottom);

  g.userData.hands = { hourHand, minHand, secHand };
  group.add(g);
  return g;
}

/** Aviator sunglasses with mirror lenses */
export function buildSunglasses(group: THREE.Group) {
  const g = new THREE.Group();
  const gold = MAT.gold();
  const lensMat = MAT.mirror(0x1a1a22);

  const lensGeo = new THREE.SphereGeometry(0.16, 32, 32);
  const lensL = new THREE.Mesh(lensGeo, lensMat);
  lensL.scale.set(1.15, 0.85, 0.22);
  lensL.position.set(-0.2, 0, 0);
  const lensR = lensL.clone();
  lensR.position.x = 0.2;
  g.add(lensL, lensR);

  const rimGeo = new THREE.TorusGeometry(0.155, 0.018, 12, 40);
  const rimL = new THREE.Mesh(rimGeo, gold);
  rimL.position.copy(lensL.position);
  rimL.scale.set(1.15, 0.85, 1);
  const rimR = rimL.clone();
  rimR.position.x = 0.2;
  g.add(rimL, rimR);

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.02), gold);
  bridge.position.set(0, 0.03, 0);
  g.add(bridge);

  function temple(side: 1 | -1) {
    const t = new THREE.Group();
    const seg1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.025, 0.45), gold);
    seg1.position.z = -0.22;
    t.add(seg1);
    const seg2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.06, 0.12), gold);
    seg2.position.set(0, -0.03, -0.48);
    seg2.rotation.x = 0.3;
    t.add(seg2);
    t.position.set(side * 0.38, 0.05, 0);
    return t;
  }
  g.add(temple(1), temple(-1));

  g.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  group.add(g);
  return g;
}
