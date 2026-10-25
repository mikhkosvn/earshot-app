import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { ACTIVE_JOB_STATUSES, JOB_POLL_INTERVAL_MS } from '@/server/jobs/constants';
import { getLabAction, listLabMetricsAction } from '@/server/labs/actions';
import type { LabView } from '@/server/labs/types';
import { ACTIVE_OPTIMIZATION_STATUSES } from '@/server/metric-optimizer/constants/optimization-statuses';

export const LabKey = {
  list: 'lab-metric-list',
  detail: 'lab-detail',
  run: 'start-lab-run',
  updateExpected: 'update-lab-expected',
  updateFeedback: 'update-lab-feedback',
  deleteRows: 'delete-lab-rows',
  saveMetric: 'save-lab-metric',
  optimize: 'start-metric-optimization',
  applyProposal: 'apply-optimization-proposal',
  dismissProposal: 'dismiss-optimization-proposal',
} as const;

export type LabKey = (typeof LabKey)[keyof typeof LabKey];

export const isLabRunActive = (lab: LabView | undefined) => {
  const status = lab?.run?.status;
  if (!status) return false;
  return ACTIVE_JOB_STATUSES.includes(status);
};

export const isOptimizationActive = (lab: LabView | undefined) => {
  const status = lab?.optimization?.status;
  if (!status) return false;
  return ACTIVE_OPTIMIZATION_STATUSES.includes(status);
};

const labInterval = (lab: LabView | undefined) => {
  if (isLabRunActive(lab) || isOptimizationActive(lab)) {
    return JOB_POLL_INTERVAL_MS;
  }
  return false;
};

export class LabService {
  static readonly listKey = [LabKey.list];
  static readonly detailKey = [LabKey.detail];
  static readonly runMutationKey = [LabKey.run];
  static readonly updateExpectedMutationKey = [LabKey.updateExpected];
  static readonly updateFeedbackMutationKey = [LabKey.updateFeedback];
  static readonly deleteRowsMutationKey = [LabKey.deleteRows];
  static readonly saveMetricMutationKey = [LabKey.saveMetric];
  static readonly optimizeMutationKey = [LabKey.optimize];
  static readonly applyProposalMutationKey = [LabKey.applyProposal];
  static readonly dismissProposalMutationKey = [LabKey.dismissProposal];

  static getMetricsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [LabKey.list, projectId],
      queryFn: () => deferAction(() => listLabMetricsAction({ projectId })),
    });
  }

  static getLabQuery({ metricId }: { metricId: number }) {
    return queryOptions({
      queryKey: [LabKey.detail, metricId],
      queryFn: () => deferAction(() => getLabAction({ metricId })),
      refetchInterval: (query) => labInterval(query.state.data),
    });
  }
}
