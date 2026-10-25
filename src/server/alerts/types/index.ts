import type { z } from 'zod';

import type {
  AlertType,
  ChangeDirection,
  MetricEvalType,
  ThresholdOperator,
} from '@/generated/prisma/enums';
import type {
  alertFiltersSchema,
  alertIdSchema,
  alertMetadataFilterSchema,
  alertParamsSchema,
  alertReviewSchema,
  createAlertSchema,
  projectScopeSchema,
  updateAlertSchema,
} from '@/server/alerts/schemas';

export type ProjectScopeInput = z.infer<typeof projectScopeSchema>;
export type AlertReviewInput = z.infer<typeof alertReviewSchema>;
export type AlertFilters = z.infer<typeof alertFiltersSchema>;
export type AlertMetadataFilter = z.infer<typeof alertMetadataFilterSchema>;
export type AlertParams = z.infer<typeof alertParamsSchema>;
export type CreateAlertInput = z.infer<typeof createAlertSchema>;
export type UpdateAlertInput = z.infer<typeof updateAlertSchema>;
export type AlertIdInput = z.infer<typeof alertIdSchema>;

export interface AlertMetricOption {
  id: number;
  name: string;
  evalType: MetricEvalType;
  agentIds: number[];
}

export interface AlertRow {
  id: number;
  name: string;
  enabled: boolean;
  type: AlertType;
  direction: ChangeDirection;
  filters: AlertFilters;
  metric: AlertMetricOption;
  thresholdOperator: ThresholdOperator | null;
  thresholdValue: number | null;
  thresholdUpperValue: number | null;
  minBreaches: number | null;
  windowSize: number | null;
  stdMultiplier: number | null;
  ewmaAlpha: number | null;
  minCalls: number | null;
  minCount: number | null;
  multiplier: number | null;
  windowHours: number | null;
  baselineHours: number | null;
  createdAt: Date;
}

export type AlertFireCounts = Record<number, number>;

export interface AlertFireRef {
  id: number;
  triggeredAt: Date;
  message: string | null;
  observedValue: number | null;
  callLogId: number | null;
}

export interface FiredAlertSummary {
  id: number;
  name: string;
  metricName: string;
  type: AlertType;
  count: number;
  lastTriggeredAt: Date;
  recent: AlertFireRef[];
}

export interface AlertTimelineBucket {
  bucketStart: Date;
  total: number;
  counts: Record<string, number>;
}

export interface AlertSeries {
  key: string;
  label: string;
}

export interface AlertReview {
  generatedAt: Date;
  summary: {
    totalFires: number;
    uniqueAlerts: number;
    topAlert: { id: number; name: string; count: number } | null;
  };
  series: AlertSeries[];
  timeline: AlertTimelineBucket[];
  alerts: FiredAlertSummary[];
}
