'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}

/**
 * Scroll-driven camera rig. Reads the canvas position in the viewport
 * each frame and eases the camera through a gentle dolly + crane move
 * as the section scrolls past — entering low and far, settling at the
 * base framing mid-viewport, rising as it leaves.
 */
function CameraRig({ base }: { base: [number, number, number] }) {
  const { camera, gl } = useThree();
  const target = useRef(new THREE.Vector3(...base));

  useFrame(() => {
    const rect = gl.domElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    // -1 (section below viewport) → 0 (centered) → 1 (section above)
    const progress = THREE.MathUtils.clamp(
      (viewportHeight / 2 - (rect.top + rect.height / 2)) /
        (viewportHeight / 2 + rect.height / 2),
      -1,
      1
    );

    target.current.set(
      base[0] + progress * 0.4,
      base[1] + progress * 0.9,
      base[2] + Math.abs(progress) * 1.4
    );
    camera.position.lerp(target.current, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Shared R3F canvas with performance-minded defaults: capped DPR,
 * transparent background, no shadow maps — plus the scroll camera rig.
 */
export default function SceneCanvas({
  children,
  cameraPosition = [0, 0, 6],
  fov = 45,
}: SceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: cameraPosition, fov }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <CameraRig base={cameraPosition} />
      {children}
    </Canvas>
  );
}
