'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES, TOOLS_BADGES } from '@/constants';
import { SectionHeader } from '@/components/ui';
import styles from './SkillsSection.module.css';

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState('bi');

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        {/* Header */}
        <SectionHeader
          label="Expertise"
          titleFirst="Skills &"
          titleHighlight="Capabilities"
        />

        {/* Tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-tab-${cat.id}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  position: 'relative',
                  border: isActive ? `1px solid ${cat.color}` : '1px solid var(--glass-border)',
                  color: isActive ? cat.color : 'var(--text-muted)',
                  background: 'transparent',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: `${cat.color}12`,
                      borderRadius: '50px',
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeCategory.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={`glass-card ${styles.skillCard}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel} style={{ color: activeCategory.color }}>
                  {skill.level}%
                </span>
              </div>

              <p className={styles.skillDesc}>{skill.desc}</p>

              {/* Progress bar */}
              <div className={styles.progressBg}>
                <motion.div
                  className={styles.progressFill}
                  style={{ background: `linear-gradient(90deg, ${activeCategory.color}, ${activeCategory.color}88)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom skill badges */}
        <motion.div
          className={styles.badges}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={styles.badgesLabel}>Also experienced with:</p>
          <div className={styles.badgeRow}>
            {TOOLS_BADGES.map((b) => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
