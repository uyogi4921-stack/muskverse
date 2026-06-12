'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

function Earth() {
  const group = useRef<THREE.Group>(null);
  const atmosphere = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.08;
    }
    if (atmosphere.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.012;
      atmosphere.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      <group ref={group}>
        {/* Planet body */}
        <mesh>
          <sphereGeometry args={[2.1, 48, 48]} />
          <meshStandardMaterial
            color="#0a1626"
            roughness={0.75}
            metalness={0.25}
            emissive="#0c2d4d"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Latitude/longitude grid */}
        <mesh>
          <sphereGeometry args={[2.13, 28, 28]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
        {/* City lights as a sparse point shell */}
        <CityLights />
      </group>
      {/* Atmosphere glow */}
      <mesh ref={atmosphere}>
        <sphereGeometry args={[2.32, 48, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function CityLights() {
  const positions = useRef<Float32Array | null>(null);
  if (!positions.current) {
    const count = 380;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = 2.14 * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = 2.14 * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = 2.14 * Math.cos(phi);
    }
    positions.current = arr;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0.4, 6.4]} fov={42}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 4]} intensity={1.6} color="#bfe6ff" />
      <pointLight position={[-6, -2, -4]} intensity={1.2} color="#f97316" />
      <Stars radius={60} depth={40} count={2400} factor={3} fade speed={0.6} />
      <Particles count={220} radius={7} color="#38bdf8" size={0.03} />
      <Earth />
    </SceneCanvas>
  );
}
