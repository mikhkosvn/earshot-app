import { LAB_DESCRIPTION_PREVIEW_LENGTH } from '@/server/labs/constants/lab-run';
import type { LabScore } from '@/server/labs/types';

export const descriptionPreview = (description: string) => {
  const text = description.trim();
  if (text.length <= LAB_DESCRIPTION_PREVIEW_LENGTH) return text;
  return `${text.slice(0, LAB_DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`;
};

export const scoreText = (score: LabScore) => `${score.matched}/${score.total}`;
