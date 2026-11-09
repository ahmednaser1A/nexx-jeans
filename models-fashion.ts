import * as THREE from "three";
import { MAT } from "./three-utils";

/** Luxury suited mannequin with jacket, tie, lapels, sunglasses */
export function buildMannequin(group: THREE.Group) {
  const m = new THREE.Group();

  const skin = new THREE.MeshStandardMaterial({
    color: 0xc9a17e,
    roughness: 0.5,
    metalness: 0.05,
  });
  const suit = new THREE.MeshStandardMaterial({
    color: 0x16161e,
    roughness: 0.38,
    metalness: 0.2,
  });
  const shirt = new THREE.MeshStandardMaterial({
    color: 0xf2ead8,
    roughness: 0.65,
  });
  const gold = MAT.gold();
  const black = MAT.blackMetal();
  const tie = new THREE.MeshStandardMaterial({
    color: 0x8a1f2d,
    roughness: 0.4,
  });

  // Shoes
  const shoeGeo = new THREE.BoxGeometry(0.14, 0.08, 0.32);
  const shoeL = new THREE.Mesh(shoeGeo, black);
  shoeL.position.set(-0.12, 0.04, 0.06);
  const shoeR = new THREE.Mesh(shoeGeo, black);
  shoeR.position.set(0.12, 0.04, 0.06);

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.085, 0.065, 0.82, 20);
  const legL = new THREE.Mesh(legGeo, suit);
  legL.position.set(-0.12, 0.49, 0);
  const legR = new THREE.Mesh(legGeo, suit);
  legR.position.set(0.12, 0.49, 0);

  // Torso (lathe, elliptical)
  const pts = [
    new THREE.Vector2(0.001, 0),
    new THREE.Vector2(0.18, 0.02),
    new THREE.Vector2(0.215, 0.2),
    new THREE.Vector2(0.245, 0.4),
    new THREE.Vector2(0.255, 0.54),
    new THREE.Vector2(0.215, 0.66),
    new THREE.Vector2(0.14, 0.72),
  ];
  const torso = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), suit);
  torso.scale.set(1.18, 1, 0.72);
  torso.position.y = 0.86;

  // Shirt chest
  const shirtMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.185, 0.46, 24),
    shirt
  );
  shirtMesh.scale.set(1.18, 1, 0.72);
  shirtMesh.position.set(0, 1.32, 0.02);

  // Tie
  const tieMesh = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.34, 0.02), tie);
  tieMesh.position.set(0, 1.3, 0.145);
  tieMesh.rotation.x = 0.08;
  const tieKnot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.025), tie);
  tieKnot.position.set(0, 1.5, 0.14);

  // Lapels
  const lapelGeo = new THREE.BoxGeometry(0.1, 0.36, 0.015);
  const lapelL = new THREE.Mesh(lapelGeo, suit);
  lapelL.position.set(-0.095, 1.42, 0.155);
  lapelL.rotation.set(-0.12, 0.4, 0.28);
  const lapelR = new THREE.Mesh(lapelGeo, suit);
  lapelR.position.set(0.095, 1.42, 0.155);
  lapelR.rotation.set(-0.12, -0.4, -0.28);

  // Gold buttons
  for (let i = 0; i < 2; i++) {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.012, 16),
      gold
    );
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0, 1.12 - i * 0.14, 0.185);
    m.add(btn);
  }

  // Pocket square
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.01), shirt);
  pocket.position.set(-0.16, 1.44, 0.15);
  pocket.rotation.z = 0.2;

  // Arms
  function arm(side: 1 | -1) {
    const a = new THREE.Group();
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 20, 20),
      suit
    );
    a.add(shoulder);
    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.06, 0.42, 16),
      suit
    );
    upper.position.y = -0.21;
    a.add(upper);
    const cuff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.062, 0.05, 16),
      shirt
    );
    cuff.position.y = -0.44;
    a.add(cuff);
    const fore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.05, 0.3, 16),
      suit
    );
    fore.position.y = -0.6;
    a.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), skin);
    hand.position.y = -0.78;
    hand.scale.set(1, 1.3, 1);
    a.add(hand);
    a.position.set(side * 0.3, 1.52, 0);
    a.rotation.z = side * 0.22;
    a.rotation.x = 0.12;
    return a;
  }
  m.add(arm(1), arm(-1));

  // Neck & head
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.08, 0.16, 16),
    skin
  );
  neck.position.y = 1.66;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.185, 32, 32), skin);
  head.position.y = 1.9;
  head.scale.set(0.92, 1.08, 0.95);

  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.19, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({ color: 0x1c1410, roughness: 0.6 })
  );
  hair.position.y = 1.93;
  hair.scale.set(0.95, 1.05, 0.98);
  hair.rotation.x = -0.25;

  // Sunglasses
  const lensGeo = new THREE.SphereGeometry(0.055, 16, 16);
  const lensMat = MAT.mirror(0x111111);
  const lensL = new THREE.Mesh(lensGeo, lensMat);
  lensL.position.set(-0.07, 1.92, 0.155);
  lensL.scale.set(1, 0.8, 0.4);
  const lensR = lensL.clone();
  lensR.position.x = 0.07;
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.012), gold);
  bridge.position.set(0, 1.93, 0.16);

  m.add(
    shoeL, shoeR, legL, legR, torso, shirtMesh, tieMesh, tieKnot,
    lapelL, lapelR, pocket, neck, head, hair, lensL, lensR, bridge
  );
  m.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  group.add(m);
  return m;
}

/** Customizable t-shirt (extruded silhouette) */
export function buildTShirt(group: THREE.Group, color = 0x1a1a1e) {
  const g = new THREE.Group();
  const fabric = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    metalness: 0,
  });

  const s = new THREE.Shape();
  s.moveTo(-0.42, 0.55);
  s.lineTo(-0.78, 0.38);
  s.lineTo(-0.62, 0.12);
  s.lineTo(-0.42, 0.22);
  s.lineTo(-0.42, -0.62);
  s.lineTo(0.42, -0.62);
  s.lineTo(0.42, 0.22);
  s.lineTo(0.62, 0.12);
  s.lineTo(0.78, 0.38);
  s.lineTo(0.42, 0.55);
  s.quadraticCurveTo(0, 0.38, -0.42, 0.55);

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.07,
    bevelSegments: 5,
    curveSegments: 24,
  });
  geo.center();
  const body = new THREE.Mesh(geo, fabric);
  body.name = "shirtBody";
  body.castShadow = true;
  g.add(body);

  // Collar
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.035, 12, 32, Math.PI),
    fabric
  );
  collar.position.set(0, 0.52, 0.08);
  collar.rotation.x = 0.35;
  collar.rotation.z = Math.PI;
  g.add(collar);

  // Hem
  const hem = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.3), fabric);
  hem.position.y = -0.6;
  g.add(hem);

  // Gold chest logo
  const logo = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.018, 10, 32),
    MAT.gold()
  );
  logo.position.set(0, 0.08, 0.17);
  g.add(logo);
  const logoDot = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 12), MAT.gold());
  logoDot.position.set(0, 0.08, 0.17);
  g.add(logoDot);

  group.add(g);
  return g;
}

/** Detailed sneaker with sole, laces, swoosh accent, air bubble */
export function buildSneaker(group: THREE.Group, accent = 0xd4af37) {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({
    color: 0xf2f0ea,
    roughness: 0.5,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: accent,
    roughness: 0.35,
    metalness: 0.4,
  });
  const black = MAT.blackMetal();

  // Sole
  const soleShape = new THREE.Shape();
  soleShape.moveTo(0, 0.62);
  soleShape.bezierCurveTo(0.26, 0.62, 0.33, 0.38, 0.31, 0.1);
  soleShape.bezierCurveTo(0.29, -0.2, 0.25, -0.48, 0.15, -0.6);
  soleShape.lineTo(-0.15, -0.6);
  soleShape.bezierCurveTo(-0.25, -0.48, -0.29, -0.2, -0.31, 0.1);
  soleShape.bezierCurveTo(-0.33, 0.38, -0.26, 0.62, 0, 0.62);
  const soleGeo = new THREE.ExtrudeGeometry(soleShape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
    curveSegments: 20,
  });
  const sole = new THREE.Mesh(soleGeo, white);
  sole.rotation.x = -Math.PI / 2;
  sole.position.y = 0.08;
  g.add(sole);

  // Toe box
  const toe = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), white);
  toe.scale.set(1, 0.62, 1.5);
  toe.position.set(0, 0.24, 0.28);
  g.add(toe);

  // Heel
  const heel = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), white);
  heel.scale.set(0.95, 0.85, 1.1);
  heel.position.set(0, 0.3, -0.32);
  g.add(heel);

  // Ankle collar
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.045, 12, 24),
    black
  );
  collar.position.set(0, 0.5, -0.3);
  collar.rotation.x = Math.PI / 2 - 0.3;
  g.add(collar);

  // Tongue
  const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.3), white);
  tongue.position.set(0, 0.42, -0.05);
  tongue.rotation.x = -0.5;
  g.add(tongue);

  // Laces
  for (let i = 0; i < 4; i++) {
    const lace = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.2, 8),
      black
    );
    lace.rotation.z = Math.PI / 2;
    lace.position.set(0, 0.4 - i * 0.02, 0.05 + i * 0.09);
    lace.rotation.x = -0.4;
    g.add(lace);
  }

  // Swoosh accents
  const swooshShape = new THREE.Shape();
  swooshShape.moveTo(-0.28, 0);
  swooshShape.quadraticCurveTo(0, -0.12, 0.3, 0.06);
  swooshShape.quadraticCurveTo(0.05, 0.02, -0.28, 0.1);
  swooshShape.closePath();
  const swooshGeo = new THREE.ExtrudeGeometry(swooshShape, {
    depth: 0.015,
    bevelEnabled: false,
  });
  const swL = new THREE.Mesh(swooshGeo, accentMat);
  swL.position.set(-0.24, 0.22, 0.05);
  swL.rotation.y = -Math.PI / 2;
  const swR = new THREE.Mesh(swooshGeo, accentMat);
  swR.position.set(0.24, 0.22, 0.05);
  swR.rotation.y = Math.PI / 2;
  g.add(swL, swR);

  // Air bubble
  const bubble = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.05, 0.3, 6, 12),
    MAT.mirror(accent)
  );
  bubble.rotation.z = Math.PI / 2;
  bubble.position.set(0, 0.08, -0.35);
  g.add(bubble);

  g.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  group.add(g);
  return g;
}
