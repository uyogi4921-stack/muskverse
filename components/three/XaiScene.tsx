'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Crystalline intelligence core — nested icosahedra with an energy heart. */
function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const middle = useRef<THREE.Mesh>(null);
  const heart = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y = t * 0.25;
      outer.current.rotation.x = t * 0.1;
    }
    if (middle.current) {
      middle.current.rotation.y = -t * 0.4;
      middle.current.rotation.z = t * 0.15;
    }
    if (heart.current) {
      const pulse = 1 + Math.sin(t * 3.2) * 0.12;
      heart.current.scale.setScalar(pulse);
      const mat = heart.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 3.2) * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={middle}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color="#0e7490"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.5}
          flatShading
        />
      </mesh>
      <mesh ref={heart}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#22d3ee" distance={8} />
    </group>
  );
}

export default function XaiScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 5]} intensity={1} color="#a5f3fc" />
      <Particles count={260} radius={5.5} color="#22d3ee" size={0.024} speed={0.08} />
      <Core />
    </SceneCanvas>
  );
}
