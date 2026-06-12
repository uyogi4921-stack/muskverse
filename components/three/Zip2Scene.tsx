'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Wireframe city-guide globe with orbiting map pins. */
function MapGlobe() {
  const group = useRef<THREE.Group>(null);
  const pinsRef = useRef<THREE.Group>(null);

  const pins = useMemo(() => {
    const list: { position: THREE.Vector3 }[] = [];
    for (let i = 0; i < 14; i += 1) {
      const theta = (i / 14) * Math.PI * 2;
      const phi = Math.acos(2 * ((i * 0.37) % 1) - 1);
      list.push({
        position: new THREE.Vector3(
          1.85 * Math.sin(phi) * Math.cos(theta),
          1.85 * Math.sin(phi) * Math.sin(theta),
          1.85 * Math.cos(phi)
        ),
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.18;
    if (pinsRef.current) pinsRef.current.rotation.y = t * 0.18;
  });

  return (
    <group rotation={[0.3, 0, 0.12]}>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.8, 24, 24]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.78, 32, 32]} />
          <meshStandardMaterial
            color="#06121f"
            roughness={0.85}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
      <group ref={pinsRef}>
        {pins.map((pin, i) => (
          <mesh key={i} position={pin.position}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#f97316' : '#7dd3fc'} />
          </mesh>
        ))}
      </group>
      {/* Equatorial route ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 96]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function Zip2Scene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#7dd3fc" />
      <Particles count={140} radius={5} color="#38bdf8" />
      <MapGlobe />
    </SceneCanvas>
  );
}
