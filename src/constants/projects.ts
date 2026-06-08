import portfolioData from '@/data/portfolio.json';
import { getIcon } from '@/lib/icons';
import type { Project } from '@/types';

export const PROJECTS: Project[] = portfolioData.projects.map((project: any) => ({
  id: project.id,
  title: project.title,
  subtitle: project.subtitle,
  description: project.description,
  tags: project.tags,
  color: project.color,
  gradient: project.gradient,
  github: project.github,
  live: project.live,
  icon: getIcon(project.icon)
}));
