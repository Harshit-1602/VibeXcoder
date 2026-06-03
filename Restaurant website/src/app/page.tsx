'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { Soundscape } from '@/components/ui/Soundscape';
import { ToastProvider } from '@/components/ui/Toast';
import { UIOverlay } from '@/components/ui/UIOverlay';

const SceneManager = dynamic(() => import('@/components/canvas/SceneManager'), { ssr: false });

export default function Home() {
  return (
    <ToastProvider>
      <main className="relative min-h-screen w-full bg-[#0a0a0f]">
        <Preloader />
        <ScrollProgress />

        {/* 3D Background */}
        <Suspense fallback={null}>
          <SceneManager />
        </Suspense>

        {/* Scrollable HTML Content */}
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar />
          <UIOverlay />
        </div>

        {/* Floating UI */}
        <FloatingContact />
        <Soundscape />
        <BackToTop />
      </main>
    </ToastProvider>
  );
}
