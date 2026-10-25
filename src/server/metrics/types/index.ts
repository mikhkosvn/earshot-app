import type { z } from 'zod';

import type {
  EvaluationTrigger,
  HistoryChangeType,
  MetricCategory,
  MetricEvalType,
  MetricSubCategory,
  MetricType,
  PatternReviewStage,
  PatternReviewStatus,
  PredefinedMetricBadge,
  TranscriptRole,
} from '@/generated/prisma/enums';
import type { SampleSource } from '@/server/metrics/constants/pattern-review/sample-source';
import type {
  assignMetricAgentsSchema,
  bulkCreateMetricsSchema,
  bulkUpdateMetricFlagsSchema,
  copyPredefinedMetricsSchema,
  createMetricSchema,
  deleteMetricsSchema,
  generatedMetricSchema,
  generatedTriggerSchema,
  generateEvaluationTriggerSchema,
  improvedMetricSchema,
  improveMetricSchema,
  listMetricsSchema,
  metricDefinitionObject,
  metricIdSchema,
  metricSnapshotSchema,
  metricValueSchema,
  projectIdSchema,
  reorderMetricsSchema,
  reviewIdSchema,
  setPatternCorrectionSchema,
  startMetricGenerationSchema,
  startQuickMetricBuildSchema,
  updateMetricAgentsSchema,
  updateMetricFlagsSchema,
  updateMetricSampleRateSchema,
  updateMetricSchema,
} from '@/server/metrics/schemas';

export type ProjectIdInput = z.input<typeof projectIdSchema>;
export type MetricIdInput = z.input<typeof metricIdSchema>;
export type ListMetricsInput = z.input<typeof listMetricsSchema>;
export type MetricDefinitionValues = z.input<typeof metricDefinitionObject>;
export type CreateMetricInput = z.input<typeof createMetricSchema>;
export type UpdateMetricInput = z.input<typeof updateMetricSchema>;
export type UpdateMetricFlagsInput = z.input<typeof updateMetricFlagsSchema>;
export type BulkUpdateMetricFlagsInput = z.input<
  typeof bulkUpdateMetricFlagsSchema
>;
export type UpdateMetricSampleRateInput = z.input<
  typeof updateMetricSampleRateSchema
>;
export type ReorderMetricsInput = z.input<typeof reorderMetricsSchema>;
export type UpdateMetricAgentsInput = z.input<typeof updateMetricAgentsSchema>;
export type AssignMetricAgentsInput = z.input<typeof assignMetricAgentsSchema>;
export type DeleteMetricsInput = z.input<typeof deleteMetricsSchema>;
export type CopyPredefinedMetricsInput = z.input<
  typeof copyPredefinedMetricsSchema
>;
export type StartMetricGenerationInput = z.input<
  typeof startMetricGenerationSchema
>;
export type GeneratedMetricDraft = z.output<typeof generatedMetricSchema>;
export type BulkCreateMetricsInput = z.input<typeof bulkCreateMetricsSchema>;
export type StartQuickMetricBuildInput = z.input<
  typeof startQuickMetricBuildSchema
>;
export type ImproveMetricInput = z.input<typeof improveMetricSchema>;
export type GenerateEvaluationTriggerInput = z.input<
  typeof generateEvaluationTriggerSchema
>;
export type ReviewIdInput = z.input<typeof reviewIdSchema>;
export type SetPatternCorrectionInput = z.input<
  typeof setPatternCorrectionSchema
>;

export type MetricValue = z.output<typeof metricValueSchema>;

export interface MetricListItem {
  id: number;
  name: string;
  description: string;
  type: MetricType;
  evalType: MetricEvalType;
  evaluationTrigger: EvaluationTrigger;
  observabilityEnabled: boolean;
  simulationEnabled: boolean;
  samplingEnabled: boolean;
  sampleRate: number | null;
  displayOrder: number;
  userDefined: boolean;
  editable: boolean;
  observabilityLocked: boolean;
  code: string | null;
  functionName: string | null;
  addToNewAgents: boolean;
  agentIds: number[];
  dependencies: MetricReference[];
}

export interface MetricReference {
  id: number;
  name: string;
}

export interface MetricDetail extends MetricDefinitionValues {
  id: number;
  projectId: number;
  userDefined: boolean;
  editable: boolean;
  code: string | null;
  functionName: string | null;
  agentIds: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricOption {
  id: number;
  name: string;
  slug: string | null;
  type: MetricType;
  evalType: MetricEvalType;
  userDefined: boolean;
}

export interface AgentOption {
  id: number;
  name: string;
  language: string;
  description: string;
}

export interface ScenarioOption {
  id: number;
  name: string;
}

export interface PredefinedMetricCard {
  id: number;
  code: string;
  name: string;
  description: string;
  evalType: MetricEvalType;
  category: MetricCategory;
  subCategory: MetricSubCategory | null;
  badge: PredefinedMetricBadge | null;
  added: boolean;
}

export type MetricSnapshot = z.output<typeof metricSnapshotSchema>;

export interface MetricVersionView {
  id: number;
  version: number;
  changeType: HistoryChangeType;
  changeReason: string | null;
  createdAt: Date;
  createdBy: { id: number; name: string } | null;
  snapshot: MetricSnapshot;
}

export interface CreatedMetric {
  id: number;
  name: string;
  reviewId: number | null;
}

export interface MetricGenerationJobResult {
  summary: string;
  deepLink: string;
  agentId: number;
  metrics: GeneratedMetricDraft[];
}

export type ImprovedMetric = z.output<typeof improvedMetricSchema>;

export type GeneratedTrigger = z.output<typeof generatedTriggerSchema>;

export interface PatternEvidenceView {
  speaker: TranscriptRole;
  time: string;
  text: string;
  isKey: boolean;
}

export interface PatternSampleView {
  conversationId: number;
  source: SampleSource;
  sourceId: number;
  label: string;
  verdict: MetricValue;
  skipped: boolean;
  error: string | null;
  explanation: string[];
  callEndReason: string | null;
  href: string | null;
}

export interface PatternCorrectionView {
  value: MetricValue;
  note: string;
}

export interface PatternGroupView {
  key: string;
  label: string;
  summary: string;
  verdict: MetricValue;
  inconsistent: boolean;
  size: number;
  evidence: PatternEvidenceView[];
  representative: PatternSampleView | null;
  others: PatternSampleView[];
  correction: PatternCorrectionView | null;
}

export interface PatternReviewCounts {
  total: number;
  evaluated: number;
  pass: number;
  fail: number;
  skipped: number;
  error: number;
}

export interface PatternReviewView {
  id: number;
  status: PatternReviewStatus;
  stage: PatternReviewStage | null;
  insufficientHistory: boolean;
  error: string | null;
  metric: {
    id: number;
    name: string;
    type: MetricType;
    evalType: MetricEvalType;
    description: string;
    customCode: string | null;
    enumValues: string[];
  };
  counts: PatternReviewCounts;
  groups: PatternGroupView[];
  rebuiltAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface StartedPatternReview {
  reviewId: number;
  jobId: string;
}
