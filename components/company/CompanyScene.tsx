'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { Company } from '@/data/companies';
import SceneLoader from '@/components/ui/SceneLoader';

// next/dynamic requires inline object-literal options, so each scene
// spells out { ssr: false, loading } instead of sharing a constant.
const SCENES: Record<Company['scene'], ComponentType> = {
  origins: dynamic(() => import('@/components/three/OriginsScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  zip2: dynamic(() => import('@/components/three/Zip2Scene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  paypal: dynamic(() => import('@/components/three/PaypalScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  spacex: dynamic(() => import('@/components/three/SpacexScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  tesla: dynamic(() => import('@/components/three/TeslaScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  neuralink: dynamic(() => import('@/components/three/NeuralinkScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  boring: dynamic(() => import('@/components/three/BoringScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  x: dynamic(() => import('@/components/three/XScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
  xai: dynamic(() => import('@/components/three/XaiScene'), {
    ssr: false,
    loading: () => <SceneLoader />,
  }),
};

export default function CompanyScene({ scene }: { scene: Company['scene'] }) {
  const Scene = SCENES[scene];
  return <Scene />;
}
