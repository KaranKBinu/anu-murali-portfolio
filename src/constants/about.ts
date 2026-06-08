import portfolioData from '@/data/portfolio.json';
import { getIcon } from '@/lib/icons';
import type { PersonalityTrait } from '@/types';

export const PERSONALITY_TRAITS: PersonalityTrait[] = portfolioData.about.traits.map(t => ({
  title: t.title,
  description: t.description,
  color: t.color,
  icon: getIcon(t.icon)
}));
