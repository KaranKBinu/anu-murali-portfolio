'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import styles from './EducationSection.module.css';

const timeline = [
  {
    id: 1,
    icon: GraduationCap,
    period: '2021 – 2024',
    degree: 'Diploma in Computer Engineering',
    institution: 'Government Polytechnic',
    description:
      'Built a strong foundation in computer science fundamentals — programming, system design, networking, and software development principles. Graduated with distinction.',
    tags: ['Programming', 'System Design', 'Networking', 'Algorithms'],
    color: '#00d4ff',
    side: 'left',
  },
  {
    id: 2,
    icon: BookOpen,
    period: '2023 – 2024',
    degree: 'Data Science with AI & ML',
    institution: 'Advanced Learning Program',
    description:
      'Deep-dived into the world of artificial intelligence and machine learning. Mastered data pipelines, model training, evaluation, and deploying ML solutions at scale.',
    tags: ['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis'],
    color: '#7c3aed',
    side: 'right',
  },
  {
    id: 3,
    icon: Award,
    period: '2024',
    degree: 'Power BI & Data Transformation',
    institution: 'Microsoft Certified Training',
    description:
      'Specialized in business intelligence tooling, data modeling, DAX, and building executive-level dashboards that transform raw data into decision-enabling visuals.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'ETL'],
    color: '#f59e0b',
    side: 'left',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Education</span>
          <h2>
            My Learning <span className="gradient-text">Journey</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {timeline.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.item} ${item.side === 'right' ? styles.itemRight : ''}`}
              initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
            >
              {/* Card */}
              <div className={`glass-card ${styles.card}`}>
                {/* Period badge */}
                <div className={styles.period} style={{ color: item.color }}>
                  {item.period}
                </div>

                {/* Header */}
                <div className={styles.cardHeader}>
                  <div
                    className={styles.cardIcon}
                    style={{
                      background: `linear-gradient(135deg, ${item.color}25, ${item.color}10)`,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    <item.icon size={20} color={item.color} />
                  </div>
                  <div>
                    <h3 className={styles.degree}>{item.degree}</h3>
                    <p className={styles.institution}>{item.institution}</p>
                  </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.tag}
                      style={{
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}30`,
                        color: item.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline dot */}
              <div
                className={styles.dot}
                style={{
                  background: item.color,
                  boxShadow: `0 0 15px ${item.color}80`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
