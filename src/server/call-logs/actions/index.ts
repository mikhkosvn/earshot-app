'use server';

import type { ActionResult } from '@/lib/action-result';
import { uploadCallLogs } from '@/server/call-logs/ingest/upload-call-logs';
import { getCallLog } from '@/server/call-logs/list/get-call-log';
import { hasCallLogs } from '@/server/call-logs/list/has-call-logs';
import { listCallLogs } from '@/server/call-logs/list/list-call-logs';
import { listCallMetricColumns } from '@/server/call-logs/list/list-call-metric-columns';
import { recomputeCallMetrics } from '@/server/call-logs/review/recompute-call-metrics';
import { updateCallFeedback } from '@/server/call-logs/review/update-call-feedback';
import { updateCallReview } from '@/server/call-logs/review/update-call-review';
import { createEvaluatorsFromCalls } from '@/server/call-logs/reuse/create-evaluators-from-calls';
import type {
  CallJobStarted,
  CallLogDetail,
  CallLogIdInput,
  CallLogIdsInput,
  CallLogListPage,
  CallMetricColumn,
  EvaluatorsFromCallsInput,
  ListCallLogsInput,
  ProjectScopeInput,
  UpdateCallFeedbackInput,
  UpdateCallReviewInput,
  UploadCallLogsInput,
} from '@/server/call-logs/types';
import { runAction } from '@/server/common/run-action';
import { CallLogsActionOperation } from '@/server/call-logs/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listCallLogsAction(
  args: ListCallLogsInput,
): Promise<CallLogListPage> {
  return withActionEvent(CallLogsActionOperation.listCallLogs, () =>
    listCallLogs(args),
  );
}

export async function hasCallLogsAction(
  args: ProjectScopeInput,
): Promise<boolean> {
  return withActionEvent(CallLogsActionOperation.hasCallLogs, () =>
    hasCallLogs(args),
  );
}

export async function getCallLogAction(
  args: CallLogIdInput,
): Promise<CallLogDetail> {
  return withActionEvent(CallLogsActionOperation.getCallLog, () =>
    getCallLog(args),
  );
}

export async function listCallMetricColumnsAction(
  args: ProjectScopeInput,
): Promise<CallMetricColumn[]> {
  return withActionEvent(CallLogsActionOperation.listCallMetricColumns, () =>
    listCallMetricColumns(args),
  );
}

export async function uploadCallLogsAction(
  args: UploadCallLogsInput,
): Promise<ActionResult<{ callLogIds: number[] }>> {
  return withActionEvent(CallLogsActionOperation.uploadCallLogs, () =>
    runAction(() => uploadCallLogs(args)),
  );
}

export async function updateCallReviewAction(
  args: UpdateCallReviewInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(CallLogsActionOperation.updateCallReview, () =>
    runAction(() => updateCallReview(args)),
  );
}

export async function updateCallFeedbackAction(
  args: UpdateCallFeedbackInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(CallLogsActionOperation.updateCallFeedback, () =>
    runAction(() => updateCallFeedback(args)),
  );
}

export async function recomputeCallMetricsAction(
  args: CallLogIdsInput,
): Promise<ActionResult<CallJobStarted>> {
  return withActionEvent(CallLogsActionOperation.recomputeCallMetrics, () =>
    runAction(() => recomputeCallMetrics(args)),
  );
}

export async function createEvaluatorsFromCallsAction(
  args: EvaluatorsFromCallsInput,
): Promise<ActionResult<CallJobStarted>> {
  return withActionEvent(
    CallLogsActionOperation.createEvaluatorsFromCalls,
    () => runAction(() => createEvaluatorsFromCalls(args)),
  );
}
