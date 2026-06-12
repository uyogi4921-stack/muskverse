'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

// Voxel pixel-art ship — a tribute to Blastar, the space shooter a
// 12-year-old Musk sold for ~$500. 1 = hull, 2 = cockpit, 3 = engine.
const SHIP_MAP = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 3, 0, 3, 0, 0, 1],
];

const VOXEL = 0.34;

function BlastarShip() {
  const group = useRef<THREE.Group>(null);
  const engines = useRef<THREE.Mesh[]>([]);

  const voxels = useMemo(() => {
    const list: { x: number; y: number; kind: number }[] = [];
    SHIP_MAP.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) return;
        list.push({
          x: (colIndex - (row.length - 1) / 2) * VOXEL,
          y: ((SHIP_MAP.length - 1) / 2 - rowIndex) * VOXEL,
          kind: cell,
        });
      });
    });
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.5) * 0.5;
      group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
      group.current.position.y = Math.sin(t * 1.2) * 0.18;
    }
    engines.current.forEach((engine, i) => {
      if (!engine) return;
      const flicker = 0.6 + Math.abs(Math.sin(t * 16 + i * 1.7)) * 0.8;
      engine.scale.y = flicker;
      engine.position.y = engine.userData.baseY - (flicker * 0.3) / 2;
    });
  });

  let engineIndex = 0;

  return (
    <group ref={group}>
      {voxels.map((voxel, i) => {
        if (voxel.kind === 3) {
          const idx = engineIndex;
          engineIndex += 1;
          return (
            <mesh
              key={i}
              position={[voxel.x, voxel.y - 0.2, 0]}
              userData={{ baseY: voxel.y - 0.2 }}
              ref={(el) => {
                if (el) engines.current[idx] = el;
              }}
            >
              <boxGeometry args={[VOXEL * 0.55, 0.3, VOXEL * 0.55]} />
              <meshBasicMaterial color="#fde68a" transparent opacity={0.9} />
            </mesh>
          );
        }
        const isCockpit = voxel.kind === 2;
        return (
          <mesh key={i} position={[voxel.x, voxel.y, 0]}>
            <boxGeometry args={[VOXEL * 0.94, VOXEL * 0.94, VOXEL * 0.94]} />
            <meshStandardMaterial
              color={isCockpit ? '#bbf7d0' : '#166534'}
              emissive={isCockpit ? '#86efac' : '#22c55e'}
              emissiveIntensity={isCockpit ? 0.9 : 0.35}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Retro CRT scan grid floor. */
function RetroGrid() {
  const grid = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (grid.current) {
      grid.current.position.z = (state.clock.elapsedTime * 0.8) % 1;
    }
  });

  return (
    <gridHelper
      ref={grid}
      args={[24, 24, '#4ade80', '#14532d']}
      position={[0, -2.2, 0]}
    />
  );
}

export default function OriginsScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0.6, 6]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 5]} intensity={1.3} color="#86efac" />
      <pointLight position={[-4, -2, -3]} intensity={0.7} color="#38bdf8" />
      <Particles count={160} radius={5.5} color="#4ade80" size={0.022} />
      <BlastarShip />
      <RetroGrid />
    </SceneCanvas>
  );
}
