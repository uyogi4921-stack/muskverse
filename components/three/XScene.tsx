'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Monolithic chrome X — the bird, retired. */
function XMark() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.4;
      group.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.z = -t * 0.2;
    }
  });

  const barMaterial = (
    <meshStandardMaterial
      color="#e2e8f0"
      metalness={0.95}
      roughness={0.18}
      emissive="#475569"
      emissiveIntensity={0.4}
    />
  );

  return (
    <group>
      <group ref={group}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[3.4, 0.62, 0.62]} />
          {barMaterial}
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[3.4, 0.62, 0.62]} />
          {barMaterial}
        </mesh>
        {/* Edge glow plates */}
        <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.33]}>
          <boxGeometry args={[3.42, 0.1, 0.01]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]} position={[0, 0, 0.33]}>
          <boxGeometry args={[3.42, 0.1, 0.01]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      </group>
      {/* Broadcast ring */}
      <mesh ref={ring} rotation={[1.35, 0.2, 0]}>
        <torusGeometry args={[2.5, 0.014, 8, 96]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.4} />
      </mesh>
      <pointLight position={[0, 0, 2]} intensity={1.4} color="#e2e8f0" distance={8} />
    </group>
  );
}

export default function XScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6.4]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#f1f5f9" />
      <pointLight position={[-5, -3, -3]} intensity={0.7} color="#38bdf8" />
      <Particles count={200} radius={5.5} color="#cbd5e1" size={0.02} speed={0.06} />
      <XMark />
    </SceneCanvas>
  );
}
