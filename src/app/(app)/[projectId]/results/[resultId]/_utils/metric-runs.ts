import { MetricEvalType } from '@/generated/prisma/enums';
import type { ResultMetricTile, TileRun } from '@/server/results/types';

import { MetricRunTab } from '../_constants/result-detail';

const OUTCOME_EVAL_TYPES: MetricEvalType[] = [
  MetricEvalType.binary,
  MetricEvalType.continuous_qualitative,
];

export const hasOutcomeTabs = (tile: Pick<ResultMetricTile, 'evalType'>) =>
  OUTCOME_EVAL_TYPES.includes(tile.evalType);

export const isPassedRun = (run: TileRun) => {
  if (run.passed !== null) return run.passed;
  return run.value === true;
};

export const runsOfTab = (runs: TileRun[], tab: MetricRunTab) => {
  if (tab === MetricRunTab.success) return runs.filter(isPassedRun);
  return runs.filter((run) => !isPassedRun(run));
};

export const defaultRunTab = (runs: TileRun[]) => {
  if (runsOfTab(runs, MetricRunTab.failure).length === 0) {
    return MetricRunTab.success;
  }
  return MetricRunTab.failure;
};
