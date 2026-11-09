"use client";

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import Scene3D from "./Scene3D";
import { MAT } from "./three-utils";

function IconShell({
  build,
  className = "w-full h-full",
}: {
  build: (g: THREE.Group) => THREE.Group;
  className?: string;
}) {
  return (
    <Scene3D
      className={className}
      cameraPosition={[0, 0.35, 2.1]}
      target={[0, 0, 0]}
      autoRotateSpeed={2.4}
      build={({ group }) => {
        const model = build(group);
        return (t: number) => {
          model.position.y = Math.sin(t * 1.6) * 0.05;
        };
      }}
    />
  );
}

function finish(g: THREE.Group) {
  g.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  return g;
}

/** 3D delivery truck */
export function TruckIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const gold = MAT.gold();
        const dark = MAT.blackMetal();
        const body = new THREE.Mesh(
          new RoundedBoxGeometry(0.95, 0.55, 0.5, 3, 0.06),
          gold
        );
        body.position.set(-0.08, 0.12, 0);
        const cab = new THREE.Mesh(
          new RoundedBoxGeometry(0.4, 0.42, 0.46, 3, 0.06),
          dark
        );
        cab.position.set(0.55, 0.02, 0);
        g.add(body, cab);
        for (const [x, z] of [
          [-0.35, 0.24],
          [-0.35, -0.24],
          [0.5, 0.24],
          [0.5, -0.24],
        ] as const) {
          const wheel = new THREE.Mesh(
            new THREE.CylinderGeometry(0.13, 0.13, 0.08, 20),
            dark
          );
          wheel.rotation.x = Math.PI / 2;
          wheel.position.set(x, -0.3, z);
          g.add(wheel);
        }
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D shield */
export function ShieldIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const s = new THREE.Shape();
        s.moveTo(0, 0.55);
        s.bezierCurveTo(0.3, 0.42, 0.45, 0.38, 0.45, 0.15);
        s.bezierCurveTo(0.45, -0.2, 0.28, -0.42, 0, -0.55);
        s.bezierCurveTo(-0.28, -0.42, -0.45, -0.2, -0.45, 0.15);
        s.bezierCurveTo(-0.45, 0.38, -0.3, 0.42, 0, 0.55);
        const geo = new THREE.ExtrudeGeometry(s, {
          depth: 0.16,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 3,
          curveSegments: 24,
        });
        geo.center();
        const shield = new THREE.Mesh(geo, MAT.gold());
        g.add(shield);
        const star = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.14),
          MAT.mirror(0xffffff)
        );
        star.position.z = 0.14;
        g.add(star);
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D gem */
export function GemIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const gem = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.5),
          MAT.mirror(0xd4af37)
        );
        gem.scale.y = 1.25;
        g.add(gem);
        const inner = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.26),
          new THREE.MeshStandardMaterial({
            color: 0xfff6d8,
            emissive: 0xd4af37,
            emissiveIntensity: 0.35,
            roughness: 0.2,
          })
        );
        inner.scale.y = 1.25;
        g.add(inner);
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D crown */
export function CrownIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const gold = MAT.gold();
        const base = new THREE.Mesh(
          new RoundedBoxGeometry(0.85, 0.26, 0.3, 3, 0.05),
          gold
        );
        base.position.y = -0.25;
        g.add(base);
        for (const x of [-0.3, 0, 0.3]) {
          const cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.13, 0.4, 4),
            gold
          );
          cone.position.set(x, 0.05, 0);
          cone.rotation.y = Math.PI / 4;
          g.add(cone);
          const tip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), gold);
          tip.position.set(x, 0.3, 0);
          g.add(tip);
        }
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D gift box */
export function BoxIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const box = new THREE.Mesh(
          new RoundedBoxGeometry(0.72, 0.72, 0.72, 3, 0.06),
          MAT.leather(0x2a1a12)
        );
        g.add(box);
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.73, 0.73, 0.73)),
          new THREE.LineBasicMaterial({ color: 0xd4af37 })
        );
        g.add(edges);
        const ribbonV = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.74, 0.74),
          MAT.gold()
        );
        g.add(ribbonV);
        const ribbonH = new THREE.Mesh(
          new THREE.BoxGeometry(0.74, 0.74, 0.16),
          MAT.gold()
        );
        g.add(ribbonH);
        const bow = new THREE.Mesh(
          new THREE.TorusGeometry(0.12, 0.04, 10, 24),
          MAT.gold()
        );
        bow.position.y = 0.42;
        g.add(bow);
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D star */
export function StarIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const shape = new THREE.Shape();
        const pts = 5;
        const outer = 0.52;
        const inner = 0.24;
        for (let i = 0; i < pts * 2; i++) {
          const r = i % 2 === 0 ? outer : inner;
          const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        shape.closePath();
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 0.18,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 2,
        });
        geo.center();
        const star = new THREE.Mesh(geo, MAT.gold());
        g.add(star);
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D shopping bag */
export function BagIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const body = new THREE.Mesh(
          new RoundedBoxGeometry(0.8, 0.9, 0.4, 3, 0.07),
          MAT.leather(0x4a2415)
        );
        g.add(body);
        const handle = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.035, 12, 32, Math.PI),
          MAT.gold()
        );
        handle.position.y = 0.45;
        g.add(handle);
        const clasp = new THREE.Mesh(
          new RoundedBoxGeometry(0.18, 0.12, 0.05, 2, 0.02),
          MAT.gold()
        );
        clasp.position.set(0, 0.1, 0.21);
        g.add(clasp);
        group.add(g);
        return finish(g);
      }}
    />
  );
}

/** 3D heart */
export function HeartIcon3D() {
  return (
    <IconShell
      build={(group) => {
        const g = new THREE.Group();
        const s = new THREE.Shape();
        s.moveTo(0, -0.4);
        s.bezierCurveTo(-0.55, 0.0, -0.4, 0.5, 0, 0.18);
        s.bezierCurveTo(0.4, 0.5, 0.55, 0.0, 0, -0.4);
        const geo = new THREE.ExtrudeGeometry(s, {
          depth: 0.2,
          bevelEnabled: true,
          bevelThickness: 0.06,
          bevelSize: 0.06,
          bevelSegments: 3,
          curveSegments: 24,
        });
        geo.center();
        const heart = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: 0xc0392b,
            roughness: 0.25,
            metalness: 0.3,
          })
        );
        g.add(heart);
        group.add(g);
        return finish(g);
      }}
    />
  );
}
