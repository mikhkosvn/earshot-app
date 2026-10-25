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

export async function listCallLogsAction(
  args: ListCallLogsInput,
): Promise<CallLogListPage> {
  return listCallLogs(args);
}

export async function hasCallLogsAction(
  args: ProjectScopeInput,
): Promise<boolean> {
  return hasCallLogs(args);
}

export async function getCallLogAction(
  args: CallLogIdInput,
): Promise<CallLogDetail> {
  return getCallLog(args);
}

export async function listCallMetricColumnsAction(
  args: ProjectScopeInput,
): Promise<CallMetricColumn[]> {
  return listCallMetricColumns(args);
}

export async function uploadCallLogsAction(
  args: UploadCallLogsInput,
): Promise<ActionResult<{ callLogIds: number[] }>> {
  return runAction(() => uploadCallLogs(args));
}

export async function updateCallReviewAction(
  args: UpdateCallReviewInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => updateCallReview(args));
}

export async function updateCallFeedbackAction(
  args: UpdateCallFeedbackInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => updateCallFeedback(args));
}

export async function recomputeCallMetricsAction(
  args: CallLogIdsInput,
): Promise<ActionResult<CallJobStarted>> {
  return runAction(() => recomputeCallMetrics(args));
}

export async function createEvaluatorsFromCallsAction(
  args: EvaluatorsFromCallsInput,
): Promise<ActionResult<CallJobStarted>> {
  return runAction(() => createEvaluatorsFromCalls(args));
}
