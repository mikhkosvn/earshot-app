import {
  MetricEvalType,
  MetricEvaluationStatus,
} from '@/generated/prisma/enums';
import type { ConversationMetricItem } from '@/server/conversations/types';
import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';

import { MetricDisplayKind } from '../_constants/metric-display';

const PERCENT = 100;

export const isExpectedOutcomeMetric = (metric: ConversationMetricItem) =>
  metric.functionName === PredefinedFunction.evaluate_expected_outcome;

export const metricDisplayKind = (
  metric: ConversationMetricItem,
): MetricDisplayKind => {
  if (metric.status !== MetricEvaluationStatus.completed) {
    return MetricDisplayKind.status;
  }
  if (metric.value === null) {
    if (metric.evalType === MetricEvalType.continuous_qualitative) {
      return MetricDisplayKind.empty;
    }
    return MetricDisplayKind.none;
  }
  if (metric.value === true) return MetricDisplayKind.passed;
  if (metric.value === false) return MetricDisplayKind.failed;
  if (metric.evalType === MetricEvalType.continuous_qualitative) {
    return MetricDisplayKind.percent;
  }
  if (typeof metric.value === 'number') return MetricDisplayKind.number;
  return MetricDisplayKind.text;
};

export const metricPercent = (metric: ConversationMetricItem) =>
  Math.round((metric.normalizedScore ?? 0) * PERCENT);

export const metricNumberText = (value: ConversationMetricItem['value']) => {
  if (typeof value !== 'number') return String(value ?? '');
  return String(Math.round(value * PERCENT) / PERCENT);
};
