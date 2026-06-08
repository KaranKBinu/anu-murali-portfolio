'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';

const skillCategories = [
  {
    id: 'bi',
    label: 'Business Intelligence',
    color: '#00d4ff',
    skills: [
      { name: 'Power BI', level: 90, desc: 'Interactive dashboards, DAX, data modeling' },
      { name: 'Data Visualization', level: 85, desc: 'Charts, reports, executive dashboards' },
      { name: 'DAX / M Language', level: 80, desc: 'Advanced formulas and queries' },
      { name: 'Excel Analytics', level: 88, desc: 'Pivot tables, Power Query, VBA' },
    ],
  },
  {
    id: 'ds',
    label: 'Data Science',
    color: '#7c3aed',
    skills: [
      { name: 'Python', level: 85, desc: 'Pandas, NumPy, Scikit-learn, Matplotlib' },
      { name: 'Data Transformation', level: 90, desc: 'ETL pipelines, data cleaning, feature engineering' },
      { name: 'Statistical Analysis', level: 78, desc: 'Hypothesis testing, regression, EDA' },
      { name: 'SQL', level: 82, desc: 'Queries, joins, optimization, reporting' },
    ],
  },
  {
    id: 'aiml',
    label: 'AI & Machine Learning',
    color: '#f59e0b',
    skills: [
      { name: 'Machine Learning', level: 82, desc: 'Supervised, unsupervised, model evaluation' },
      { name: 'Deep Learning', level: 72, desc: 'Neural networks, CNNs, TensorFlow/Keras' },
      { name: 'NLP Basics', level: 68, desc: 'Text processing, sentiment analysis' },
      { name: 'Model Deployment', level: 70, desc: 'Flask APIs, model serving' },
    ],
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('bi');

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Expertise</span>
          <h2>
            Skills &amp; <span className="gradient-text">Capabilities</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              id={`skill-tab-${cat.id}`}
              className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(cat.id)}
              style={
                activeTab === cat.id
                  ? {
                      '--tab-color': cat.color,
                      borderColor: cat.color,
                      color: cat.color,
                      background: `${cat.color}15`,
                    } as React.CSSProperties
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
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
            {['Jupyter Notebook', 'Google Colab', 'Git & GitHub', 'Tableau', 'MySQL', 'Power Query', 'Seaborn', 'Matplotlib'].map((b) => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
