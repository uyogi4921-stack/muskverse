'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

const RING_COUNT = 14;
const RING_SPACING = 1.6;
const TUNNEL_DEPTH = RING_COUNT * RING_SPACING;

/** Infinite tunnel of glowing rings flowing toward the camera. */
function Tunnel() {
  const rings = useRef<THREE.Group>(null);

  const ringOffsets = useMemo(
    () => Array.from({ length: RING_COUNT }, (_, i) => i * RING_SPACING),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!rings.current) return;
    rings.current.children.forEach((ring, i) => {
      // March rings toward the camera and wrap them to the back
      const z = ((ringOffsets[i] + t * 1.8) % TUNNEL_DEPTH) - TUNNEL_DEPTH + 2;
      ring.position.z = z;
      ring.rotation.z = t * 0.12 + i * 0.25;
      const fade = 1 - Math.min(1, Math.abs(z) / TUNNEL_DEPTH);
      const mesh = ring as THREE.Mesh;
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.12 + fade * 0.55;
    });
  });

  return (
    <group rotation={[0.06, -0.25, 0]}>
      <group ref={rings}>
        {ringOffsets.map((_, i) => (
          <mesh key={i}>
            <torusGeometry args={[1.9, 0.035, 10, 48]} />
            <meshBasicMaterial
              color={i % 4 === 0 ? '#f97316' : '#facc15'}
              transparent
            />
          </mesh>
        ))}
      </group>
      {/* Guide rails */}
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, -1.6, -TUNNEL_DEPTH / 2 + 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, TUNNEL_DEPTH, 8]} />
          <meshBasicMaterial color="#facc15" transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Light at the end of the tunnel */}
      <mesh position={[0, 0, -TUNNEL_DEPTH + 2]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0, -6]} intensity={2} color="#facc15" distance={16} />
    </group>
  );
}

export default function BoringScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 4.5]} fov={55}>
      <ambientLight intensity={0.3} />
      <Tunnel />
    </SceneCanvas>
  );
}
