'use client';

import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PERSONALITY_TRAITS, ABOUT_CHIPS, ABOUT_TITLE_FIRST, ABOUT_TITLE_HIGHLIGHT, ABOUT_BIO_PARAGRAPHS } from '@/constants';
import styles from './AboutSection.module.css';

function DataGlobe() {
  const groupRef = useRef<THREE.Group>(null!);
  const dotsRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  const { positions } = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      positions[i * 3] = Math.cos(theta) * Math.sin(phi) * 1.5;
      positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 1.5;
      positions[i * 3 + 2] = Math.cos(phi) * 1.5;
    }
    return { positions };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.2 + x * 0.8, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.1) * 0.1 + y * 0.8, 0.05);
    }

    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 1.0 + Math.sin(t * 3) * 0.5;
      const coreScale = 1.0 + Math.sin(t * 3) * 0.08;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 24, 24]}>
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00d4ff"
          size={0.03}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, Math.PI / 8, 0]}>
        <torusGeometry args={[1.75, 0.012, 8, 80]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 1.7, -Math.PI / 6, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 80]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className={gridClass(styles.grid)}>
          {/* Left: Text */}
          <div className={styles.textCol}>
            <motion.span
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {ABOUT_TITLE_FIRST}{' '}
              <span className="gradient-text">{ABOUT_TITLE_HIGHLIGHT}</span>
            </motion.h2>

            {ABOUT_BIO_PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                className={styles.bio}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}

            {/* Traits */}
            <div className={styles.traits}>
              {PERSONALITY_TRAITS.map((trait, i) => (
                <motion.div
                  key={trait.title}
                  className={`glass-card ${styles.traitCard}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={styles.traitIcon}
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, ${trait.color} 13%, transparent), color-mix(in srgb, ${trait.color} 7%, transparent))`,
                      border: `1px solid color-mix(in srgb, ${trait.color} 20%, transparent)`,
                    }}
                  >
                    <trait.icon size={20} color={trait.color} />
                  </div>
                  <div>
                    <h4 className={styles.traitTitle} style={{ color: trait.color }}>
                      {trait.title}
                    </h4>
                    <p className={styles.traitDesc}>{trait.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 3D Globe */}
          <motion.div
            className={styles.globeCol}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.globeWrapper}>
              <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[3, 3, 3]} color="#00d4ff" intensity={2} />
                <pointLight position={[-3, -2, -2]} color="#7c3aed" intensity={1.5} />
                <DataGlobe />
              </Canvas>
              <div className={styles.globeGlow} />
            </div>

            {/* Floating chips */}
            <div className={styles.chips}>
              {ABOUT_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip}
                  className={styles.chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Utility to handle string classes cleanly
function gridClass(cls: string) {
  return cls || '';
}

export default AboutSection;
