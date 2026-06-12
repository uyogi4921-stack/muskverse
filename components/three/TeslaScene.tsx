'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Sleek sedan silhouette — extruded side profile with wheel arches. */
function Car() {
  const group = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Mesh[]>([]);

  const bodyGeometry = useMemo(() => {
    const s = new THREE.Shape();
    // Side profile, nose at +x. Floor sits at y=0.1; arches cut upward.
    s.moveTo(2.15, 0.1);
    s.lineTo(1.62, 0.1);
    s.absarc(1.2, 0.1, 0.42, 0, Math.PI, true);
    s.lineTo(-0.78, 0.1);
    s.absarc(-1.2, 0.1, 0.42, 0, Math.PI, true);
    s.lineTo(-2.1, 0.1);
    // Tail
    s.quadraticCurveTo(-2.22, 0.42, -2.05, 0.62);
    // Trunk + rear glass
    s.quadraticCurveTo(-1.6, 0.72, -1.25, 0.78);
    s.quadraticCurveTo(-0.7, 1.18, 0.05, 1.2);
    // Roof → windshield
    s.quadraticCurveTo(0.8, 1.16, 1.25, 0.78);
    // Hood
    s.quadraticCurveTo(1.8, 0.68, 2.18, 0.5);
    // Nose
    s.quadraticCurveTo(2.32, 0.32, 2.15, 0.1);

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.24,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.12,
      bevelSegments: 4,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  const wheelPositions: [number, number, number][] = [
    [1.2, -0.55, 0.62],
    [-1.2, -0.55, 0.62],
    [1.2, -0.55, -0.62],
    [-1.2, -0.55, -0.62],
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.35;
    wheels.current.forEach((wheel) => {
      if (wheel) wheel.rotation.z = -t * 2.4;
    });
  });

  return (
    <group ref={group} position={[0, -0.1, 0]} rotation={[0.1, 0, 0]}>
      {/* Body */}
      <mesh geometry={bodyGeometry} position={[0, -0.05, 0]}>
        <meshStandardMaterial
          color="#991b1b"
          metalness={0.9}
          roughness={0.22}
          emissive="#450a0a"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Glass canopy band */}
      <mesh position={[-0.07, 0.62, 0]}>
        <boxGeometry args={[1.55, 0.34, 1.18]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.08}
          emissive="#0b1220"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Light bars */}
      <mesh position={[2.32, 0.02, 0]}>
        <boxGeometry args={[0.05, 0.06, 1.15]} />
        <meshBasicMaterial color="#f4f4f5" />
      </mesh>
      <mesh position={[-2.28, 0.12, 0]}>
        <boxGeometry args={[0.05, 0.06, 1.15]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {/* Wheels */}
      {wheelPositions.map((position, i) => (
        <group key={i} position={position}>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            ref={(el) => {
              if (el) wheels.current[i] = el;
            }}
          >
            <cylinderGeometry args={[0.4, 0.4, 0.22, 24]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} metalness={0.3} />
          </mesh>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, position[2] > 0 ? 0.12 : -0.12]}
          >
            <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
            <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {/* Turntable ring */}
      <mesh position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.56, 64]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function TeslaScene() {
  return (
    <SceneCanvas cameraPosition={[0, 1.3, 6.6]}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} color="#fecaca" />
      <pointLight position={[-5, 2, -3]} intensity={0.9} color="#38bdf8" />
      <Particles count={120} radius={5.5} color="#ef4444" size={0.02} />
      <Car />
    </SceneCanvas>
  );
}
