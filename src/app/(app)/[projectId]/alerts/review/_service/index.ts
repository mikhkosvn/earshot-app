import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listAgentOptionsAction } from '@/server/agents/actions';
import {
  getAlertFireCountsAction,
  getAlertReviewAction,
  listAlertMetricOptionsAction,
  listAlertsAction,
} from '@/server/alerts/actions';
import type { AlertWindowHours } from '@/server/alerts/constants/alert-window';

export const AlertKey = {
  review: 'alert-review',
  fireCounts: 'alert-fire-counts',
  list: 'alert-list',
  metricOptions: 'alert-metric-options',
  agentOptions: 'alert-agent-options',
  create: 'alert-create',
  update: 'alert-update',
  remove: 'alert-delete',
} as const;

export type AlertKey = (typeof AlertKey)[keyof typeof AlertKey];

type ReviewArgs = { projectId: number; hours: AlertWindowHours };

export class AlertService {
  static readonly reviewKey = [AlertKey.review];
  static readonly fireCountsKey = [AlertKey.fireCounts];
  static readonly listKey = [AlertKey.list];
  static readonly createMutationKey = [AlertKey.create];
  static readonly updateMutationKey = [AlertKey.update];
  static readonly deleteMutationKey = [AlertKey.remove];

  static getReviewQuery(args: ReviewArgs) {
    return queryOptions({
      queryKey: [AlertKey.review, args],
      queryFn: () => deferAction(() => getAlertReviewAction(args)),
    });
  }

  static getFireCountsQuery(args: ReviewArgs) {
    return queryOptions({
      queryKey: [AlertKey.fireCounts, args],
      queryFn: () => deferAction(() => getAlertFireCountsAction(args)),
    });
  }

  static getListQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [AlertKey.list, projectId],
      queryFn: () => deferAction(() => listAlertsAction({ projectId })),
    });
  }

  static getMetricOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [AlertKey.metricOptions, projectId],
      queryFn: () =>
        deferAction(() => listAlertMetricOptionsAction({ projectId })),
    });
  }

  static getAgentOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [AlertKey.agentOptions, projectId],
      queryFn: () => deferAction(() => listAgentOptionsAction({ projectId })),
    });
  }
}
