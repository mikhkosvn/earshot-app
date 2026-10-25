import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listAgentOptionsAction } from '@/server/agents/actions';
import {
  getCallLogAction,
  hasCallLogsAction,
  listCallLogsAction,
  listCallMetricColumnsAction,
} from '@/server/call-logs/actions';
import { CALL_POLL_INTERVAL_MS } from '@/server/call-logs/constants/call-log-limits';
import type {
  CallLogDetail,
  CallLogListPage,
  ListCallLogsInput,
} from '@/server/call-logs/types';
import { listFoldersAction } from '@/server/folders/actions';
import { listSavedViewsAction } from '@/server/saved-views/actions';

import { hasActiveCall, isActiveCall } from '../_utils/call-processing';

export const CallKey = {
  list: 'call-list',
  hasCalls: 'call-has-calls',
  metricColumns: 'call-metric-columns',
  detail: 'call-detail',
  savedViews: 'call-saved-views',
  agentOptions: 'call-agent-options',
  folders: 'call-folders',
  upload: 'call-upload',
  updateReview: 'call-update-review',
  updateFeedback: 'call-update-feedback',
  recompute: 'call-recompute',
  useAsEvaluator: 'call-use-as-evaluator',
  addToLab: 'call-add-to-lab',
  share: 'call-share',
  export: 'call-export',
} as const;

export type CallKey = (typeof CallKey)[keyof typeof CallKey];

const listInterval = (page: CallLogListPage | undefined) => {
  if (page && hasActiveCall(page.rows)) return CALL_POLL_INTERVAL_MS;
  return false;
};

const detailInterval = (call: CallLogDetail | undefined) => {
  if (call && isActiveCall(call)) return CALL_POLL_INTERVAL_MS;
  return false;
};

export class CallService {
  static readonly listKey = [CallKey.list];
  static readonly hasCallsKey = [CallKey.hasCalls];
  static readonly detailKey = [CallKey.detail];
  static readonly uploadMutationKey = [CallKey.upload];
  static readonly updateReviewMutationKey = [CallKey.updateReview];
  static readonly updateFeedbackMutationKey = [CallKey.updateFeedback];
  static readonly recomputeMutationKey = [CallKey.recompute];
  static readonly useAsEvaluatorMutationKey = [CallKey.useAsEvaluator];
  static readonly addToLabMutationKey = [CallKey.addToLab];
  static readonly shareMutationKey = [CallKey.share];
  static readonly exportMutationKey = [CallKey.export];

  static getListQuery(args: ListCallLogsInput) {
    return queryOptions({
      queryKey: [CallKey.list, args],
      queryFn: () => deferAction(() => listCallLogsAction(args)),
      refetchInterval: (query) => listInterval(query.state.data),
    });
  }

  static getHasCallsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CallKey.hasCalls, projectId],
      queryFn: () => deferAction(() => hasCallLogsAction({ projectId })),
    });
  }

  static getMetricColumnsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CallKey.metricColumns, projectId],
      queryFn: () =>
        deferAction(() => listCallMetricColumnsAction({ projectId })),
    });
  }

  static getDetailQuery({ callLogId }: { callLogId: number }) {
    return queryOptions({
      queryKey: [CallKey.detail, callLogId],
      queryFn: () => deferAction(() => getCallLogAction({ callLogId })),
      refetchInterval: (query) => detailInterval(query.state.data),
    });
  }

  static getSavedViewsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CallKey.savedViews, projectId],
      queryFn: () => deferAction(() => listSavedViewsAction({ projectId })),
    });
  }

  static getAgentOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CallKey.agentOptions, projectId],
      queryFn: () => deferAction(() => listAgentOptionsAction({ projectId })),
    });
  }

  static getFoldersQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CallKey.folders, projectId],
      queryFn: () => deferAction(() => listFoldersAction({ projectId })),
    });
  }
}
