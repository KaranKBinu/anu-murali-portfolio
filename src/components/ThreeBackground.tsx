'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralParticles() {
  const ref = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions, linePositions } = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const nodes: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodes.push([x, y, z]);
    }

    const lineVerts: number[] = [];
    const threshold = 1.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          lineVerts.push(...nodes[i], ...nodes[j]);
        }
      }
    }

    return {
      positions,
      linePositions: new Float32Array(lineVerts),
    };
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.04;
      ref.current.rotation.y = t * 0.06;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = t * 0.04;
      linesRef.current.rotation.y = t * 0.06;
    }
  });

  return (
    <>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </lineSegments>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </>
  );
}

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={0.8} />
        <NeuralParticles />
        <FloatingOrb position={[-3, 1.5, -2]} color="#00d4ff" scale={0.6} />
        <FloatingOrb position={[3, -1, -3]} color="#7c3aed" scale={0.8} />
        <FloatingOrb position={[1, 2.5, -4]} color="#f59e0b" scale={0.5} />
        <FloatingOrb position={[-2, -2, -2]} color="#f43f5e" scale={0.4} />
      </Canvas>
    </div>
  );
}
