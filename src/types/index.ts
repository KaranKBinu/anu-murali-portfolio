import type { LucideIcon } from 'lucide-react';

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

// ─── Education ────────────────────────────────────────────────────────────────

export type TimelineSide = 'left' | 'right';

export interface EducationItem {
  id: number;
  icon: LucideIcon;
  period: string;
  degree: string;
  institution: string;
  description: string;
  tags: string[];
  color: string;
  side: TimelineSide;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export interface SkillItem {
  name: string;
  level: number;
  desc: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  skills: SkillItem[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  gradient: string;
  github: string;
  live: string;
}

// ─── Contact & Socials ────────────────────────────────────────────────────────

export interface Social {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface PersonalityTrait {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroStat {
  num: string;
  label: string;
}
