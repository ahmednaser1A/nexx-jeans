"use client";

import * as THREE from "three";
import Scene3D from "./Scene3D";
import { buildMannequin } from "./models-fashion";
import { makePedestal, makeParticles, tickParticles, MAT } from "./three-utils";

function starGeo(outer = 0.1, inner = 0.045) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

export default function HeroScene() {
  return (
    <Scene3D
      cameraPosition={[0, 2.7, 9.5]}
      target={[0, 1.05, 0]}
      autoRotateSpeed={0}
      build={({ group, camera, controls }) => {
        controls.autoRotate = false;

        const pedestal = makePedestal(1.05, 0.16);
        pedestal.position.y = 0.08;
        group.add(pedestal);

        const mannequin = buildMannequin(group);
        mannequin.position.y = 0.16;

        // Floating gold halo rings
        const halo = new THREE.Group();
        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(0.85, 0.012, 10, 80),
          MAT.gold()
        );
        ring1.rotation.x = Math.PI / 2.4;
        const ring2 = new THREE.Mesh(
          new THREE.TorusGeometry(1.05, 0.008, 10, 80),
          MAT.mirror(0xd4af37)
        );
        ring2.rotation.x = Math.PI / 1.8;
        ring2.rotation.y = 0.6;
        halo.add(ring1, ring2);
        halo.position.y = 1.15;
        group.add(halo);

        // Orbiting 3D icons
        const gem = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.09),
          MAT.mirror(0xd4af37)
        );
        const star = new THREE.Mesh(starGeo(), MAT.gold());
        const miniRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.08, 0.018, 10, 32),
          MAT.mirror(0xd4af37)
        );
        const crown = new THREE.Group();
        const crownBase = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.05, 0.05),
          MAT.gold()
        );
        crownBase.position.y = -0.03;
        crown.add(crownBase);
        for (const x of [-0.05, 0, 0.05]) {
          const spike = new THREE.Mesh(
            new THREE.ConeGeometry(0.02, 0.07, 4),
            MAT.gold()
          );
          spike.position.set(x, 0.04, 0);
          crown.add(spike);
        }
        group.add(gem, star, miniRing, crown);

        const particles = makeParticles(280, 10, 4.4);
        group.add(particles);

        // Mouse parallax
        let mx = 0;
        let my = 0;
        const onMouse = (e: MouseEvent) => {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouse);

        let smx = 0;
        let smy = 0;

        return (t: number, dt: number) => {
          tickParticles(particles, dt);
          halo.rotation.y = t * 0.25;
          halo.position.y = 1.15 + Math.sin(t * 0.8) * 0.06;
          mannequin.position.y = 0.16 + Math.sin(t * 1.1) * 0.015;

          // Smooth mouse parallax
          smx += (mx - smx) * 0.04;
          smy += (my - smy) * 0.04;

          // Cinematic dolly-in (first ~3s)
          const p = Math.min(1, t / 3.2);
          const e = 1 - Math.pow(1 - p, 3);
          camera.position.set(
            smx * 0.8,
            2.7 - e * 1.05 - smy * 0.4,
            9.5 - e * 4.3
          );

          // Orbiting icons
          gem.position.set(
            Math.cos(t * 0.45) * 1.55,
            1.75 + Math.sin(t * 1.3) * 0.16,
            Math.sin(t * 0.45) * 1.55
          );
          gem.rotation.y = t * 2.2;
          gem.rotation.x = t * 0.8;

          star.position.set(
            Math.cos(t * 0.35 + 2.1) * 1.45,
            1.15 + Math.sin(t * 1.1 + 1) * 0.18,
            Math.sin(t * 0.35 + 2.1) * 1.45
          );
          star.rotation.y = t * 1.6;
          star.rotation.z = t * 0.5;

          miniRing.position.set(
            Math.cos(t * 0.55 + 4.2) * 1.35,
            0.85 + Math.sin(t * 1.5 + 2) * 0.14,
            Math.sin(t * 0.55 + 4.2) * 1.35
          );
          miniRing.rotation.x = t * 1.4;
          miniRing.rotation.y = t * 0.9;

          crown.position.set(
            Math.cos(t * 0.4 + 5.5) * 1.5,
            2.15 + Math.sin(t * 0.9 + 3) * 0.15,
            Math.sin(t * 0.4 + 5.5) * 1.5
          );
          crown.rotation.y = -t * 1.2;
        };
      }}
    />
  );
}
