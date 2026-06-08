'use client';

import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Brain, Lightbulb, Search } from 'lucide-react';
import styles from './AboutSection.module.css';

function DataGlobe() {
  const groupRef = useRef<THREE.Group>(null!);
  const dotsRef = useRef<THREE.Points>(null!);

  const { positions } = useMemo(() => {
    const count = 300;
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
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe wireframe */}
      <Sphere args={[1.5, 24, 24]}>
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Dots on sphere */}
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

      {/* Glowing center */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.015, 8, 80]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

const traits = [
  {
    icon: Brain,
    title: 'Creative Thinker',
    description: 'Brings unique, imaginative perspectives to complex data challenges — turning abstract patterns into elegant solutions.',
    color: '#00d4ff',
  },
  {
    icon: Search,
    title: 'Deep Researcher',
    description: 'Dives deep into datasets and literature, uncovering hidden insights that others miss through meticulous analysis.',
    color: '#7c3aed',
  },
  {
    icon: Lightbulb,
    title: 'Sharp Insight',
    description: 'Translates dense data into clear, actionable intelligence — communicating complex findings with precision and clarity.',
    color: '#f59e0b',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className={styles.grid}>
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
              Turning Data Into{' '}
              <span className="gradient-text">Insight</span>
            </motion.h2>

            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I&apos;m Anu Murali — a passionate Data Science and AI/ML practitioner with a Computer
              Engineering diploma background. I specialize in transforming raw, complex datasets into
              meaningful visual stories and intelligent models that drive real decisions.
            </motion.p>

            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My approach combines deep technical knowledge with creative intuition — I don&apos;t just
              analyze data, I understand the story it&apos;s trying to tell. Whether it&apos;s Power BI
              dashboards, machine learning models, or data transformation pipelines, I bring both
              rigor and artistry to every project.
            </motion.p>

            {/* Traits */}
            <div className={styles.traits}>
              {traits.map((trait, i) => (
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
                      background: `linear-gradient(135deg, ${trait.color}22, ${trait.color}11)`,
                      border: `1px solid ${trait.color}33`,
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
              {['Power BI', 'Machine Learning', 'Data Science', 'AI/ML'].map((chip, i) => (
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
