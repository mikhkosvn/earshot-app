import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listAgentOptionsAction } from '@/server/agents/actions';
import {
  getDeepResearchAction,
  getInsightsOverviewAction,
  listInsightMetricOptionsAction,
} from '@/server/insights/actions';
import type { InsightRangeInput } from '@/server/insights/types';

export const InsightKey = {
  overview: 'insight-overview',
  metricOptions: 'insight-metric-options',
  deepResearch: 'insight-deep-research',
  agentOptions: 'insight-agent-options',
  saveConfig: 'insight-save-config',
  turnOff: 'insight-turn-off',
  newCategoryAlert: 'insight-new-category-alert',
  run: 'insight-run',
  dismissCategory: 'insight-dismiss-category',
  runDeepResearch: 'insight-run-deep-research',
  dismissMode: 'insight-dismiss-mode',
} as const;

export type InsightKey = (typeof InsightKey)[keyof typeof InsightKey];

export class InsightService {
  static readonly overviewKey = [InsightKey.overview];
  static readonly metricOptionsKey = [InsightKey.metricOptions];
  static readonly deepResearchKey = [InsightKey.deepResearch];
  static readonly saveConfigMutationKey = [InsightKey.saveConfig];
  static readonly turnOffMutationKey = [InsightKey.turnOff];
  static readonly newCategoryAlertMutationKey = [InsightKey.newCategoryAlert];
  static readonly runMutationKey = [InsightKey.run];
  static readonly dismissCategoryMutationKey = [InsightKey.dismissCategory];
  static readonly runDeepResearchMutationKey = [InsightKey.runDeepResearch];
  static readonly dismissModeMutationKey = [InsightKey.dismissMode];

  static getOverviewQuery(args: InsightRangeInput) {
    return queryOptions({
      queryKey: [InsightKey.overview, args],
      queryFn: () => deferAction(() => getInsightsOverviewAction(args)),
    });
  }

  static getMetricOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [InsightKey.metricOptions, projectId],
      queryFn: () =>
        deferAction(() => listInsightMetricOptionsAction({ projectId })),
    });
  }

  static getDeepResearchQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [InsightKey.deepResearch, projectId],
      queryFn: () => deferAction(() => getDeepResearchAction({ projectId })),
    });
  }

  static getAgentOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [InsightKey.agentOptions, projectId],
      queryFn: () => deferAction(() => listAgentOptionsAction({ projectId })),
    });
  }
}
