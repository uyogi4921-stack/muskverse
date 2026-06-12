'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Spinning digital coin — money as an entry in a database. */
function Coin() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.6;
      group.current.position.y = Math.sin(t * 0.9) * 0.15;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      <group ref={group} rotation={[0.25, 0, 0]}>
        {/* Coin body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.16, 64]} />
          <meshStandardMaterial
            color="#6d5bd0"
            metalness={0.9}
            roughness={0.25}
            emissive="#4c3a9e"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Embossed inner disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.085]}>
          <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.8}
            roughness={0.3}
            emissive="#7c5ce0"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* X mark — two crossed bars */}
        <mesh position={[0, 0, 0.115]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.3, 0.18, 0.04]} />
          <meshStandardMaterial
            color="#f4f4f5"
            emissive="#e0d9ff"
            emissiveIntensity={0.6}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.115]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[1.3, 0.18, 0.04]} />
          <meshStandardMaterial
            color="#f4f4f5"
            emissive="#e0d9ff"
            emissiveIntensity={0.6}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
      {/* Transaction orbit ring */}
      <mesh ref={ring} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[2.3, 0.012, 8, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function PaypalScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={1.6} color="#c4b5fd" />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#38bdf8" />
      <Particles count={140} radius={5} color="#a78bfa" />
      <Coin />
    </SceneCanvas>
  );
}
