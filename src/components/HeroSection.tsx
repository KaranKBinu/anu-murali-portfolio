'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import styles from './HeroSection.module.css';

const roles = ['Data Scientist', 'AI/ML Engineer', 'Power BI Expert', 'Data Visionary'];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className={styles.hero} ref={containerRef}>
      <div className={styles.content}>
        {/* Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={14} />
          <span>Open to Opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">Anu Murali</span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          className={styles.roles}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <RoleRotator roles={roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          A creative and insightful Data Science & AI/ML engineer who transforms raw data into
          compelling narratives and actionable intelligence. Passionate about building intelligent
          systems that make a real-world impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <a href="#projects" className="btn-primary" id="hero-view-work">
            View My Work
            <ArrowDown size={18} />
          </a>
          <a href="#contact" className="btn-outline" id="hero-contact">
            <Download size={18} />
            Get In Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { num: '5+', label: 'Projects Built' },
            { num: '3+', label: 'Tools Mastered' },
            { num: '2', label: 'Certifications' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statNum}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </motion.div>

      {/* Gradient fade */}
      <div className={styles.gradientBottom} />
    </section>
  );
}

function RoleRotator({ roles }: { roles: string[] }) {
  return (
    <div className={styles.roleWrapper}>
      <span className={styles.rolePrefix}>I am a&nbsp;</span>
      <div className={styles.roleTrack}>
        {roles.map((role, i) => (
          <span
            key={role}
            className={styles.role}
            style={{ animationDelay: `${i * 3}s` }}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}
