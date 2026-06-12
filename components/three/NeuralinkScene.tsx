'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

/** Glowing organic brain mesh — a vertex-displaced icosphere with neuron nodes. */
function Brain() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, 4);
    const pos = geo.attributes.position;
    const vec = new THREE.Vector3();
    for (let i = 0; i < pos.count; i += 1) {
      vec.fromBufferAttribute(pos, i);
      const noise =
        Math.sin(vec.x * 3.1) * 0.09 +
        Math.sin(vec.y * 4.3 + 1.7) * 0.08 +
        Math.sin(vec.z * 3.7 + 0.6) * 0.09;
      vec.normalize().multiplyScalar(1.6 + noise);
      // Hemisphere groove down the middle, like a real cortex
      const groove = Math.exp(-Math.pow(vec.x * 6, 2)) * 0.12;
      pos.setXYZ(i, vec.x, vec.y - groove, vec.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const nodes = useMemo(() => {
    const list: THREE.Vector3[] = [];
    for (let i = 0; i < 26; i += 1) {
      const theta = (i / 26) * Math.PI * 2 * 3.7;
      const phi = Math.acos(2 * ((i * 0.61) % 1) - 1);
      list.push(
        new THREE.Vector3(
          1.78 * Math.sin(phi) * Math.cos(theta),
          1.78 * Math.sin(phi) * Math.sin(theta),
          1.78 * Math.cos(phi)
        )
      );
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.position.y = Math.sin(t * 0.7) * 0.1;
    }
    if (shell.current) {
      const mat = shell.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.55 + Math.sin(t * 2.4) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={shell} geometry={geometry}>
        <meshStandardMaterial
          color="#3b0764"
          roughness={0.4}
          metalness={0.3}
          emissive="#c026d3"
          emissiveIntensity={0.55}
          flatShading
        />
      </mesh>
      {/* Neural wireframe overlay */}
      <mesh geometry={geometry} scale={1.02}>
        <meshBasicMaterial
          color="#f0abfc"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
      {/* Electrode nodes */}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#f0abfc" />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralinkScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 5]} intensity={1.4} color="#f0abfc" />
      <pointLight position={[-4, -3, -3]} intensity={0.8} color="#38bdf8" />
      <Particles count={170} radius={5} color="#e879f9" size={0.022} />
      <Brain />
    </SceneCanvas>
  );
}
