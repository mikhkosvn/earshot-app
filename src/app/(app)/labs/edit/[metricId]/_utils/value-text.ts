import type { LabScore } from '@/server/labs/types';
import type { MetricValue } from '@/server/metrics/types';

export const NOT_APPLICABLE_TEXT = 'N/A';

export const valueText = (value: MetricValue) => {
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (value === null) return NOT_APPLICABLE_TEXT;
  return String(value);
};

export const optionalScoreText = (score: LabScore | null) => {
  if (!score) return '-';
  return `${score.matched}/${score.total}`;
};
