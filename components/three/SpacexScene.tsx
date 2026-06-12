'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Low-poly rocket with a flickering engine plume. */
function Rocket() {
  const group = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const flameInner = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.position.y = Math.sin(t * 1.1) * 0.18;
    }
    if (flame.current) {
      const flicker = 1 + Math.sin(t * 22) * 0.18 + Math.sin(t * 9) * 0.1;
      flame.current.scale.set(1, flicker, 1);
    }
    if (flameInner.current) {
      const flicker = 1 + Math.cos(t * 27) * 0.22;
      flameInner.current.scale.set(1, flicker, 1);
    }
  });

  const finPositions: [number, number][] = [
    [0, 1],
    [(Math.PI * 2) / 3, 1],
    [(Math.PI * 4) / 3, 1],
  ];

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      {/* Nose cone */}
      <mesh position={[0, 1.75, 0]}>
        <coneGeometry args={[0.42, 1.1, 12]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 1.7, 12]} />
        <meshStandardMaterial color="#d7d7de" roughness={0.4} metalness={0.55} />
      </mesh>
      {/* Body band */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.425, 0.425, 0.12, 12]} />
        <meshStandardMaterial
          color="#f97316"
          roughness={0.45}
          emissive="#7c2d12"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Fins */}
      {finPositions.map(([angle], i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.46, -0.55, Math.sin(angle) * 0.46]}
          rotation={[0, -angle + Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.06, 0.75, 0.42]} />
          <meshStandardMaterial
            color="#9a9aa4"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}
      {/* Engine bell */}
      <mesh position={[0, -0.62, 0]}>
        <coneGeometry args={[0.3, 0.45, 12]} />
        <meshStandardMaterial color="#3a3a42" roughness={0.3} metalness={0.85} />
      </mesh>
      {/* Outer plume */}
      <mesh ref={flame} position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.26, 1.3, 12]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.85} />
      </mesh>
      {/* Inner plume */}
      <mesh ref={flameInner} position={[0, -1.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.13, 0.85, 12]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.95} />
      </mesh>
      <pointLight position={[0, -1.4, 0]} intensity={2.4} color="#f97316" distance={6} />
    </group>
  );
}

export default function SpacexScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0.4, 6.6]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#dbeafe" />
      <Particles count={180} radius={6} color="#f97316" size={0.022} />
      <Rocket />
    </SceneCanvas>
  );
}
