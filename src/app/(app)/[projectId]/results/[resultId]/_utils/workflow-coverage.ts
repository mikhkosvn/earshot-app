import type { ResultDetail } from '@/server/results/types';

import { PERCENT_SCALE } from '../_constants/result-detail';

type WorkflowPath = ResultDetail['workflow']['paths'][number];

export const coverageOf = (paths: WorkflowPath[]) => {
  const covered = paths.filter((path) => path.covered).length;
  const total = paths.length;
  if (total === 0) return { covered, total, percent: 0 };
  return { covered, total, percent: (covered / total) * PERCENT_SCALE };
};
