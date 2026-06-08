'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  titleFirst: string;
  titleHighlight: string;
  subheading?: string;
  subheadingClassName?: string;
}

export function SectionHeader({
  label,
  titleFirst,
  titleHighlight,
  subheading,
  subheadingClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-label">{label}</span>
      <h2>
        {titleFirst} <span className="gradient-text">{titleHighlight}</span>
      </h2>
      <div className="section-divider" />
      {subheading && <p className={subheadingClassName}>{subheading}</p>}
    </motion.div>
  );
}

export default SectionHeader;
