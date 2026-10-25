import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  listAgentOptionsAction,
  listMetricOptionsAction,
  listMetricsAction,
  listPredefinedMetricsAction,
} from '@/server/metrics/actions';
import { listSavedViewsAction } from '@/server/saved-views/actions';

export const MetricKey = {
  list: 'metric-list',
  agentOptions: 'metric-agent-options',
  metricOptions: 'metric-options',
  predefined: 'predefined-metrics',
  savedViews: 'saved-views',
  updateFlags: 'update-metric-flags',
  bulkUpdateFlags: 'bulk-update-metric-flags',
  updateSampleRate: 'update-metric-sample-rate',
  reorder: 'reorder-metrics',
  updateAgents: 'update-metric-agents',
  assignAgents: 'assign-metric-agents',
  delete: 'delete-metrics',
  copyPredefined: 'copy-predefined-metrics',
  startGeneration: 'start-metric-generation',
  bulkCreate: 'bulk-create-metrics',
  createView: 'create-saved-view',
} as const;

export type MetricKey = (typeof MetricKey)[keyof typeof MetricKey];

export class MetricService {
  static readonly listKey = [MetricKey.list];
  static readonly updateFlagsMutationKey = [MetricKey.updateFlags];
  static readonly bulkUpdateFlagsMutationKey = [MetricKey.bulkUpdateFlags];
  static readonly updateSampleRateMutationKey = [MetricKey.updateSampleRate];
  static readonly reorderMutationKey = [MetricKey.reorder];
  static readonly updateAgentsMutationKey = [MetricKey.updateAgents];
  static readonly assignAgentsMutationKey = [MetricKey.assignAgents];
  static readonly deleteMutationKey = [MetricKey.delete];
  static readonly copyPredefinedMutationKey = [MetricKey.copyPredefined];
  static readonly startGenerationMutationKey = [MetricKey.startGeneration];
  static readonly bulkCreateMutationKey = [MetricKey.bulkCreate];
  static readonly createViewMutationKey = [MetricKey.createView];

  static getProjectListKey({ projectId }: { projectId: number }) {
    return [MetricKey.list, projectId];
  }

  static getListQuery({
    projectId,
    viewId,
  }: {
    projectId: number;
    viewId: number | null;
  }) {
    return queryOptions({
      queryKey: [MetricKey.list, projectId, viewId],
      queryFn: () =>
        deferAction(() => listMetricsAction({ projectId, viewId })),
    });
  }

  static getAgentOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [MetricKey.agentOptions, projectId],
      queryFn: () => deferAction(() => listAgentOptionsAction({ projectId })),
    });
  }

  static getMetricOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [MetricKey.metricOptions, projectId],
      queryFn: () => deferAction(() => listMetricOptionsAction({ projectId })),
    });
  }

  static getPredefinedQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [MetricKey.predefined, projectId],
      queryFn: () =>
        deferAction(() => listPredefinedMetricsAction({ projectId })),
      staleTime: 0,
    });
  }

  static getSavedViewsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [MetricKey.savedViews, projectId],
      queryFn: () => deferAction(() => listSavedViewsAction({ projectId })),
    });
  }
}
