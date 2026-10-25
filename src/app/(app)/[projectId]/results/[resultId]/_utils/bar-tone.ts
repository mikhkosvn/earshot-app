import { LOW_PERCENT_LIMIT } from '../_constants/result-detail';

export const barToneClass = (percent: number) => {
  if (percent < LOW_PERCENT_LIMIT) return 'bg-red-500';
  return 'bg-green-500';
};
