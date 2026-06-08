'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, BarChart2, Brain, Database, TrendingUp } from 'lucide-react';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    id: 1,
    icon: BarChart2,
    title: 'Sales Intelligence Dashboard',
    subtitle: 'Power BI · Data Analytics',
    description:
      'A comprehensive Power BI dashboard tracking sales KPIs, regional performance, and product trends across 12 months of historical data. Features drill-through reports and automated alerts.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'ETL'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff20, #7c3aed10)',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Customer Churn Predictor',
    subtitle: 'Machine Learning · Python',
    description:
      'ML model achieving 89% accuracy predicting customer churn using ensemble methods. Built end-to-end pipeline from data cleaning to model deployment as a REST API with Flask.',
    tags: ['Python', 'Scikit-learn', 'Flask', 'Pandas'],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed20, #f43f5e10)',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    icon: Database,
    title: 'Data Transformation Engine',
    subtitle: 'ETL · Data Engineering',
    description:
      'Automated ETL pipeline processing 500K+ daily records — cleaning, validating, and transforming data from multiple sources into a unified analytical schema with error logging.',
    tags: ['Python', 'SQL', 'Power Query', 'Data Cleaning'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b20, #00d4ff10)',
    github: '#',
    live: '#',
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Market Trend Analyzer',
    subtitle: 'Data Science · NLP',
    description:
      'Sentiment analysis and trend detection system for financial news. Correlates news sentiment scores with stock movement patterns using NLP and time-series analysis.',
    tags: ['NLP', 'Time-Series', 'Python', 'Matplotlib'],
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e20, #7c3aed10)',
    github: '#',
    live: '#',
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease' }}
    >
      {children}
    </div>
  );
}

export default function ProjectsSection() {

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2>
            Featured <span className="gradient-text">Work</span>
          </h2>
          <div className="section-divider" />
          <p className={styles.subheading}>
            A selection of real-world data science and analytics projects
          </p>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
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
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}35`,
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
                        background: `${project.color}10`,
                        border: `1px solid ${project.color}25`,
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
        </div>
      </div>
    </section>
  );
}
