'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_ROLES, HERO_STATS, HERO_NAME, HERO_BADGE, HERO_DESCRIPTION } from '@/constants';
import { TiltCard } from '@/components/ui';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className={styles.hero} ref={containerRef}>
      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I&apos;m <span className="gradient-text">{HERO_NAME}</span>
          </motion.h1>

          <motion.div
            className={styles.roles}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <RoleRotator roles={HERO_ROLES} />
          </motion.div>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {HERO_DESCRIPTION}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a href="#projects" className="btn-primary" id="hero-view-work">
              View My Work
              <ArrowDown size={18} />
            </a>
            <a href="/resume.pdf" download="Anu_Murali_Resume.pdf" className="btn-outline" id="hero-resume">
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.glowBg} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={styles.showcaseWrapper}
          >
            <TiltCard className={styles.editorialCard}>
              <div className={styles.frameContainer}>
                <div className={`${styles.offsetFrame} ${styles.frameSecondary}`} />
                <div className={`${styles.offsetFrame} ${styles.framePrimary}`} />
                
                <div className={styles.imageWrapper}>
                  <img
                    src="/avatar.png"
                    alt="Anu Murali"
                    className={styles.avatarImage}
                  />
                  <div className={styles.badgeOverlay}>
                    <span>{HERO_BADGE}</span>
                  </div>
                </div>
              </div>

              <div className={styles.photoCaption}>
                <div className={styles.captionHeader}>
                  <span className={styles.captionTitle}>PORTFOLIO NO. 01</span>
                  <span className={styles.captionYear}>©2026</span>
                </div>
                <div className={styles.captionDivider} />
                <div className={styles.captionMeta}>
                  <span>Data Science &amp; AI/ML Engineer</span>
                  <span>Based in India / Available Worldwide</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        className={styles.statsContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statNum}>{stat.num}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </motion.div>

      <div className={styles.gradientBottom} />
    </section>
  );
}

function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className={styles.roleWrapper}>
      <span className={styles.rolePrefix}>I am a&nbsp;</span>
      <div className={styles.roleTrack}>
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            className={styles.role}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeroSection;
