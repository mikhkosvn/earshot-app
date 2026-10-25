import type { z } from 'zod';

import type {
  JobStatus,
  MetricEvalType,
  MetricType,
} from '@/generated/prisma/enums';
import type {
  deleteLabTestSetsSchema,
  labDraftSchema,
  labMetricSchema,
  labProjectSchema,
  labRunJobResultSchema,
  startLabRunSchema,
  updateLabExpectedSchema,
  updateLabFeedbackSchema,
} from '@/server/labs/schemas';
import type { OptimizationView } from '@/server/metric-optimizer/types';
import type { SampleSource } from '@/server/metrics/constants/pattern-review/sample-source';
import type { MetricValue } from '@/server/metrics/types';

export type LabProjectInput = z.input<typeof labProjectSchema>;
export type LabMetricInput = z.input<typeof labMetricSchema>;
export type LabDraft = z.output<typeof labDraftSchema>;
export type StartLabRunInput = z.input<typeof startLabRunSchema>;
export type UpdateLabExpectedInput = z.input<typeof updateLabExpectedSchema>;
export type UpdateLabFeedbackInput = z.input<typeof updateLabFeedbackSchema>;
export type DeleteLabTestSetsInput = z.input<typeof deleteLabTestSetsSchema>;

export interface LabScore {
  matched: number;
  total: number;
}

export interface LabMetricListItem {
  id: number;
  name: string;
  type: MetricType;
  evalType: MetricEvalType;
  description: string;
  score: LabScore;
}

export interface LabRowSource {
  kind: SampleSource;
  id: number | null;
  href: string | null;
}

export interface LabRowVariables {
  callEndReason: string | null;
  metadata: Record<string, unknown>;
  dynamicVariables: Record<string, unknown>;
  providerCallData: Record<string, unknown>;
}

export interface LabRowView {
  reviewId: number;
  testSetId: number;
  source: LabRowSource;
  recordingUrl: string | null;
  durationSeconds: number | null;
  transcript: string[];
  variables: LabRowVariables;
  expected: MetricValue;
  actual: MetricValue;
  scored: boolean;
  explanation: string[];
  feedback: string | null;
  matched: boolean;
}

export interface LabRunView {
  jobId: string;
  status: JobStatus;
  step: string | null;
  error: string | null;
  score: LabScore | null;
  changedReviewIds: number[];
  createdAt: Date;
}

export interface LabView {
  metricId: number;
  rows: LabRowView[];
  score: LabScore;
  run: LabRunView | null;
  optimization: OptimizationView | null;
}

export interface LabRowOutcome {
  reviewId: number;
  value: MetricValue;
  explanation: string[];
  matched: boolean;
}

export type LabRunJobResult = z.output<typeof labRunJobResultSchema>;

export interface LabReviewChange {
  reviewId: number;
  metricId: number;
}
