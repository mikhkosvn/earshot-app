import { FORK_TITLE_SUFFIX } from '@/server/personalities/constants/personality-limits';
import type { PersonalityListItem } from '@/server/personalities/types';

export const voiceText = (item: PersonalityListItem) => {
  if (!item.accent) return item.voice;
  return `${item.voice} (${item.accent})`;
};

export const personalityTitle = (item: PersonalityListItem) => {
  if (item.forkedFromId === null) return item.name;
  return `${item.name}${FORK_TITLE_SUFFIX}`;
};
