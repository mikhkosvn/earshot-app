import type { z } from 'zod';

import type {
  ComparisonOperator,
  DeepResearchStatus,
  DeepResearchTrigger,
  InsightStatus,
  MetricEvalType,
} from '@/generated/prisma/enums';
import type {
  categoryIdSchema,
  failureModeIdSchema,
  insightMetricSchema,
  insightRangeSchema,
  newCategoryAlertSchema,
  projectScopeSchema,
  runInsightSchema,
  saveInsightConfigSchema,
} from '@/server/insights/schemas';
import type { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';

export type ProjectScopeInput = z.infer<typeof projectScopeSchema>;
export type InsightRangeInput = z.infer<typeof insightRangeSchema>;
export type SaveInsightConfigInput = z.infer<typeof saveInsightConfigSchema>;
export type InsightMetricInput = z.infer<typeof insightMetricSchema>;
export type NewCategoryAlertInput = z.infer<typeof newCategoryAlertSchema>;
export type RunInsightInput = z.infer<typeof runInsightSchema>;
export type CategoryIdInput = z.infer<typeof categoryIdSchema>;
export type FailureModeIdInput = z.infer<typeof failureModeIdSchema>;

export type PassCondition = {
  operator: ComparisonOperator;
  value: string;
};

export type InsightMetricConfig = {
  enabled: boolean;
  pass: PassCondition;
  triageFailureLimit: number | null;
  alertOnNewCategories: boolean;
};

export type InsightMetricOption = {
  id: number;
  name: string;
  evalType: MetricEvalType;
  kind: RubricValueKind;
  enumValues: string[];
  defaultPass: PassCondition;
  config: InsightMetricConfig | null;
};

export type CategoryExample = {
  evaluationId: number;
  callLogId: number | null;
  externalCallId: string | null;
  explanation: string | null;
  assignedAt: Date;
};

export type InsightCategoryView = {
  id: number;
  name: string;
  description: string;
  count: number;
  examples: CategoryExample[];
};

export type LatestInsightView = {
  id: number;
  status: InsightStatus;
  headline: string | null;
  errorMessage: string | null;
  numCallsAnalyzed: number;
  totalFailuresInWindow: number;
  windowStart: Date;
  windowEnd: Date;
  createdAt: Date;
};

export type InsightCardView = {
  metricId: number;
  metricName: string;
  evalType: MetricEvalType;
  alertOnNewCategories: boolean;
  failures: number;
  categories: InsightCategoryView[];
  latestInsight: LatestInsightView | null;
};

export type FailureTrendPoint = {
  bucketStart: Date;
  counts: Record<string, number>;
};

export type FailureTrendSeries = {
  metricId: number;
  metricName: string;
  categories: { key: string; name: string }[];
  points: FailureTrendPoint[];
};

export type InsightsOverview = {
  cards: InsightCardView[];
  trends: FailureTrendSeries[];
};

export type DeepResearchModeView = {
  id: number;
  rank: number;
  title: string;
  description: string;
  callCount: number;
  exampleCallLogIds: number[];
};

export type DeepResearchView = {
  id: number;
  trigger: DeepResearchTrigger;
  status: DeepResearchStatus;
  headline: string | null;
  errorMessage: string | null;
  windowStart: Date;
  windowEnd: Date;
  numCallsAnalyzed: number;
  createdAt: Date;
  failureModes: DeepResearchModeView[];
};

export type DeepResearchState = {
  enabled: boolean;
  reports: DeepResearchView[];
};

export type InsightJobStarted = { jobId: string };
