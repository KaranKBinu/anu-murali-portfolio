'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralParticles() {
  const ref = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions, linePositions } = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    const nodes: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2.0;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodes.push([x, y, z]);
    }

    const lineVerts: number[] = [];
    const threshold = 1.8;
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
    const { x, y } = state.pointer;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    const scrollRotate = scrollY * 0.0003;
    const targetRotX = t * 0.03 + y * 0.12;
    const targetRotY = t * 0.04 + x * 0.12 + scrollRotate;

    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.05);
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = THREE.MathUtils.lerp(linesRef.current.rotation.x, targetRotX, 0.05);
      linesRef.current.rotation.y = THREE.MathUtils.lerp(linesRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  return (
    <>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.06} />
      </lineSegments>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    const targetX = x * 1.5;
    const targetY = y * 1.5 - (scrollY * 0.001);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, -scrollY * 0.0005, 0);
  });
  return null;
}

export function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <CameraRig />
        <NeuralParticles />
      </Canvas>
    </div>
  );
}

export default ThreeBackground;
