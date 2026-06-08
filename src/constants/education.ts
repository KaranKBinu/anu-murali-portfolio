import portfolioData from '@/data/portfolio.json';
import { getIcon } from '@/lib/icons';
import type { EducationItem } from '@/types';

export const EDUCATION_TIMELINE: EducationItem[] = portfolioData.education.timeline.map((item: any) => ({
  id: item.id,
  period: item.period,
  degree: item.degree,
  institution: item.institution,
  description: item.description,
  tags: item.tags,
  color: item.color,
  side: item.side,
  icon: getIcon(item.icon)
}));
