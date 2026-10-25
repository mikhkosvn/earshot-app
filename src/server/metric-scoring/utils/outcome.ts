import { MetricEvaluationStatus } from '@/generated/prisma/enums';
import type { ScoreOutcome } from '@/server/metric-scoring/types';
import type { MetricValue } from '@/server/metrics/types';

export const completed = (
  value: MetricValue,
  explanation: string[],
  extra: Record<string, unknown> | null = null,
): ScoreOutcome => ({
  status: MetricEvaluationStatus.completed,
  value,
  explanation,
  extra,
  errorMessage: null,
});

export const skipped = (explanation: string[]): ScoreOutcome => ({
  status: MetricEvaluationStatus.skipped,
  value: null,
  explanation,
  extra: null,
  errorMessage: null,
});

export const failed = (message: string): ScoreOutcome => ({
  status: MetricEvaluationStatus.failed,
  value: null,
  explanation: [],
  extra: null,
  errorMessage: message,
});
