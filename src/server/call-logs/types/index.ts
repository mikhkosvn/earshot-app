import type { z } from 'zod';

import type {
  CallEvaluationStatus,
  CallProcessingStatus,
  MetricEvalType,
  MetricEvaluationStatus,
} from '@/generated/prisma/enums';
import type {
  FilterLogic,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';
import type {
  callLogIdSchema,
  callLogIdsSchema,
  callLogListScopeSchema,
  listCallLogsSchema,
  projectScopeSchema,
  updateCallFeedbackSchema,
  updateCallReviewSchema,
  uploadCallLogsSchema,
  evaluatorsFromCallsSchema,
} from '@/server/call-logs/schemas';
import type { RubricVerdict } from '@/server/metric-scoring/types';
import type { MetricValue } from '@/server/metrics/types';

export type FilterValue =
  string | number | boolean | null | (string | number | boolean)[];

export interface FilterCondition {
  field: string;
  op: FilterOperator;
  value: FilterValue;
}

export interface FilterGroup {
  operator: FilterLogic;
  conditions: FilterNode[];
}

export type FilterNode = FilterCondition | FilterGroup;

export type ProjectScopeInput = z.input<typeof projectScopeSchema>;
export type CallLogIdInput = z.input<typeof callLogIdSchema>;
export type ListCallLogsInput = z.input<typeof listCallLogsSchema>;
export type CallLogListScope = z.output<typeof callLogListScopeSchema>;
export type UploadCallLogsInput = z.input<typeof uploadCallLogsSchema>;
export type UpdateCallReviewInput = z.input<typeof updateCallReviewSchema>;
export type UpdateCallFeedbackInput = z.input<typeof updateCallFeedbackSchema>;
export type CallLogIdsInput = z.input<typeof callLogIdsSchema>;
export type EvaluatorsFromCallsInput = z.input<
  typeof evaluatorsFromCallsSchema
>;

export interface CallMetricColumn {
  id: number;
  name: string;
  evalType: MetricEvalType;
  functionName: string | null;
}

export interface CallMetricCell {
  metricId: number;
  status: MetricEvaluationStatus;
  value: MetricValue;
  normalizedScore: number | null;
  firstTurn: number | null;
  p50: number | null;
  p99: number | null;
}

export interface CallLogRow {
  id: number;
  callId: string;
  conversationId: number;
  startedAt: Date;
  durationSeconds: number | null;
  agentId: number | null;
  agentName: string | null;
  customerNumber: string | null;
  endedReason: string | null;
  status: CallProcessingStatus;
  evaluationStatus: CallEvaluationStatus | null;
  feedback: string | null;
  errorMessage: string | null;
  metrics: CallMetricCell[];
}

export interface CallLogListPage {
  count: number;
  rows: CallLogRow[];
}

export interface CallLogDetail extends CallLogRow {
  rubric: RubricVerdict;
}

export interface CallJobStarted {
  jobId: string;
}

export interface ObservedTurn {
  role: string;
  content: string;
  start_time?: number | null;
  end_time?: number | null;
}

export type CallProcessingInput = {
  callLogId: number;
  recordingUrl: string | null;
  origin: string | null;
};
