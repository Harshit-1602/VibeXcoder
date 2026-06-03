'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Experience } from './Experience';
import * as THREE from 'three';

function ScrollDriver({ scrollRef }: { scrollRef: React.RefObject<{ offset: number }> }) {
  useFrame(() => {});
  return null;
}

export default function SceneManager() {
  const scrollRef = useRef({ offset: 0 });
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.offset = maxScroll > 0 ? scrollY / maxScroll : 0;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MutationObserver: catch any dynamically-created elements and force pointer-events:none
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const forceNoPointerEvents = (el: Element) => {
      if (el instanceof HTMLElement) {
        el.style.pointerEvents = 'none';
      }
      el.querySelectorAll('*').forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.pointerEvents = 'none';
        }
      });
    };

    // Initial pass
    forceNoPointerEvents(container);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.style.pointerEvents = 'none';
            forceNoPointerEvents(node);
          }
        });
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className="canvas-bg-layer fixed inset-0"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{
          antialias: true,
          stencil: false,
          depth: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 15, 30]} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2.2}
          color="#d4a853"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <ambientLight intensity={0.4} color="#0d0d14" />
        <pointLight position={[-5, 3, -5]} intensity={1.8} color="#c47d2a" />
        <pointLight position={[0, -5, 0]} intensity={1.0} color="#2d2d44" />

        <Experience scrollRef={scrollRef} />
        <ScrollDriver scrollRef={scrollRef} />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            luminanceThreshold={0.5}
            mipmapBlur
            intensity={1.5}
            radius={0.6}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
