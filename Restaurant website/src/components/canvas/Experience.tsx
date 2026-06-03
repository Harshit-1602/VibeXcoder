'use client';

import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function GlassTorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ref} scale={1.4}>
      <torusKnotGeometry args={[1, 0.35, 200, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.6}
        chromaticAberration={0.2}
        anisotropy={0.5}
        distortion={0.3}
        distortionScale={0.5}
        temporalDistortion={0.15}
        ior={1.6}
        color="#ffeebf"
        roughness={0.05}
      />
    </mesh>
  );
}

function OrbitingShape({
  geometry,
  color,
  metalness,
  roughness,
  radius,
  speed,
  offset,
  scale,
  floatSpeed,
  emissive,
  emissiveIntensity,
}: {
  geometry: 'octahedron' | 'dodecahedron' | 'icosahedron' | 'sphere';
  color: string;
  metalness: number;
  roughness: number;
  radius: number;
  speed: number;
  offset: number;
  scale: number;
  floatSpeed: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.5;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={ref} scale={scale} castShadow>
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={2.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          emissive={emissive ? new THREE.Color(emissive) : undefined}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </Float>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#07070b"
        metalness={0.9}
        roughness={0.15}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

interface ExperienceProps {
  scrollRef: React.RefObject<{ offset: number }>;
}

export function Experience({ scrollRef }: ExperienceProps) {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(
    () => [
      { geometry: 'octahedron' as const, color: '#121218', metalness: 0.95, roughness: 0.05, radius: 3.5, speed: 0.3, offset: 0, scale: 0.35, floatSpeed: 1.5 },
      { geometry: 'dodecahedron' as const, color: '#d4a853', metalness: 1.0, roughness: 0.1, radius: 4, speed: 0.2, offset: Math.PI * 0.6, scale: 0.28, floatSpeed: 2, emissive: '#c47d2a', emissiveIntensity: 0.3 },
      { geometry: 'icosahedron' as const, color: '#c47d2a', metalness: 0.8, roughness: 0.15, radius: 3, speed: 0.4, offset: Math.PI * 1.2, scale: 0.22, floatSpeed: 1, emissive: '#e8c97a', emissiveIntensity: 0.2 },
      { geometry: 'sphere' as const, color: '#1a1a2e', metalness: 0.9, roughness: 0.05, radius: 4.5, speed: 0.15, offset: Math.PI * 1.8, scale: 0.18, floatSpeed: 1.8 },
      { geometry: 'octahedron' as const, color: '#d4a853', metalness: 1.0, roughness: 0.08, radius: 3.2, speed: 0.25, offset: Math.PI * 0.4, scale: 0.15, floatSpeed: 2.2, emissive: '#d4a853', emissiveIntensity: 0.4 },
      { geometry: 'dodecahedron' as const, color: '#0a0a0f', metalness: 0.8, roughness: 0.1, radius: 5, speed: 0.1, offset: Math.PI, scale: 0.2, floatSpeed: 1.2 },
    ],
    []
  );

  useFrame(() => {
    if (groupRef.current && scrollRef.current) {
      const offset = scrollRef.current.offset;
      // Gentle scroll-driven rotation and vertical drift
      groupRef.current.rotation.y = offset * Math.PI * 3;
      groupRef.current.position.y = -offset * 12;
    }
  });

  return (
    <>
      <Environment preset="sunset" />

      <group ref={groupRef}>
        <GlassTorusKnot />

        {shapes.map((shape, i) => (
          <OrbitingShape key={i} {...shape} />
        ))}
      </group>

      <GridFloor />
    </>
  );
}
