'use client';

import { motion } from 'framer-motion';
import { EDUCATION_TIMELINE } from '@/constants';
import { SectionHeader } from '@/components/ui';
import styles from './EducationSection.module.css';

export function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="section-inner">
        {/* Header */}
        <SectionHeader
          label="Education"
          titleFirst="My Learning"
          titleHighlight="Journey"
        />

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {EDUCATION_TIMELINE.map((item, i) => (
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
                      background: `linear-gradient(135deg, color-mix(in srgb, ${item.color} 15%, transparent), color-mix(in srgb, ${item.color} 6%, transparent))`,
                      border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
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
                        background: `color-mix(in srgb, ${item.color} 7%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${item.color} 18%, transparent)`,
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

export default EducationSection;
