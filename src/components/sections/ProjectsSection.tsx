'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '@/constants';
import { SectionHeader, TiltCard } from '@/components/ui';
import styles from './ProjectsSection.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 14,
    },
  },
} as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        {/* Header */}
        <SectionHeader
          label="Projects"
          titleFirst="Featured"
          titleHighlight="Work"
          subheading="A selection of real-world data science and analytics projects"
          subheadingClassName={styles.subheading}
        />

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <TiltCard className={`glass-card ${styles.card}`}>
                {/* Gradient top border */}
                <div
                  className={styles.cardTop}
                  style={{ background: project.gradient }}
                />

                {/* Icon */}
                <div
                  className={styles.cardIcon}
                  style={{
                    background: `color-mix(in srgb, ${project.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${project.color} 20%, transparent)`,
                  }}
                >
                  <project.icon size={22} color={project.color} />
                </div>

                {/* Subtitle */}
                <span className={styles.subtitle} style={{ color: project.color }}>
                  {project.subtitle}
                </span>

                {/* Title */}
                <h3 className={styles.title}>{project.title}</h3>

                {/* Description */}
                <p className={styles.description}>{project.description}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.tag}
                      style={{
                        background: `color-mix(in srgb, ${project.color} 6%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${project.color} 15%, transparent)`,
                        color: project.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className={styles.links}>
                  <a
                    href={project.github}
                    className={styles.link}
                    id={`project-github-${project.id}`}
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <Code2 size={15} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className={styles.link}
                    id={`project-live-${project.id}`}
                    aria-label={`Live demo for ${project.title}`}
                    style={{ color: project.color }}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsSection;
