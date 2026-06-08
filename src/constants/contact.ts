import portfolioData from '@/data/portfolio.json';
import { getIcon } from '@/lib/icons';
import type { Social } from '@/types';

export const SOCIALS: Social[] = portfolioData.contact.socials.map(s => ({
  label: s.label,
  value: s.value,
  href: s.href,
  color: s.color,
  icon: getIcon(s.icon)
}));
