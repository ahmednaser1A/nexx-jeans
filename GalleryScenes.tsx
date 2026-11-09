"use client";

import * as THREE from "three";
import Scene3D from "./Scene3D";
import { buildSneaker } from "./models-fashion";
import {
  buildPerfume,
  buildBag,
  buildWatch,
  buildSunglasses,
} from "./models-luxury";
import { makePedestal, makeParticles, tickParticles } from "./three-utils";

function usePedestalScene(
  builder: (g: THREE.Group) => THREE.Group,
  opts: { y?: number; rotX?: number; scale?: number } = {}
) {
  return ({ group }: { group: THREE.Group }) => {
    const pedestal = makePedestal(0.85, 0.13);
    pedestal.position.y = 0.065;
    group.add(pedestal);
    const model = builder(group);
    model.position.y = opts.y ?? 0.13;
    if (opts.rotX) model.rotation.x = opts.rotX;
    if (opts.scale) model.scale.setScalar(opts.scale);
    const particles = makeParticles(120, 6, 3.2);
    group.add(particles);
    return (t: number, dt: number) => {
      tickParticles(particles, dt);
      model.position.y = (opts.y ?? 0.13) + Math.sin(t * 1.3) * 0.02;
    };
  };
}

export function SneakerScene() {
  return (
    <Scene3D
      cameraPosition={[0, 0.9, 2.6]}
      target={[0, 0.35, 0]}
      autoRotateSpeed={1.0}
      build={usePedestalScene((g) => buildSneaker(g), { y: 0.13, rotX: 0.15 })}
    />
  );
}

export function PerfumeScene() {
  return (
    <Scene3D
      cameraPosition={[0, 1.0, 2.4]}
      target={[0, 0.6, 0]}
      autoRotateSpeed={0.9}
      build={usePedestalScene((g) => buildPerfume(g), { y: 0.13, scale: 0.85 })}
    />
  );
}

export function BagScene() {
  return (
    <Scene3D
      cameraPosition={[0, 1.1, 2.8]}
      target={[0, 0.55, 0]}
      autoRotateSpeed={0.9}
      build={usePedestalScene((g) => buildBag(g), { y: 0.13, scale: 0.9 })}
    />
  );
}

export function WatchScene() {
  return (
    <Scene3D
      cameraPosition={[0, 0.7, 2.2]}
      target={[0, 0.4, 0]}
      autoRotateSpeed={0.7}
      build={({ group }) => {
        const pedestal = makePedestal(0.8, 0.13);
        pedestal.position.y = 0.065;
        group.add(pedestal);
        const watch = buildWatch(group);
        watch.position.y = 0.75;
        watch.rotation.x = -0.5;
        const particles = makeParticles(120, 6, 3.2);
        group.add(particles);
        const { hourHand, minHand, secHand } = watch.userData.hands as {
          hourHand: THREE.Mesh;
          minHand: THREE.Mesh;
          secHand: THREE.Mesh;
        };
        return (t: number, dt: number) => {
          tickParticles(particles, dt);
          watch.position.y = 0.75 + Math.sin(t * 1.2) * 0.03;
          // Live real-time hands
          const now = new Date();
          const s = now.getSeconds() + now.getMilliseconds() / 1000;
          const m = now.getMinutes() + s / 60;
          const h = (now.getHours() % 12) + m / 60;
          secHand.rotation.z = -(s / 60) * Math.PI * 2;
          minHand.rotation.z = -(m / 60) * Math.PI * 2;
          hourHand.rotation.z = -(h / 12) * Math.PI * 2;
        };
      }}
    />
  );
}

export function SunglassesScene() {
  return (
    <Scene3D
      cameraPosition={[0, 0.8, 2.2]}
      target={[0, 0.35, 0]}
      autoRotateSpeed={1.0}
      build={usePedestalScene((g) => buildSunglasses(g), {
        y: 0.45,
        rotX: 0.2,
      })}
    />
  );
}
