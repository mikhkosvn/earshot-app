import { MetricEvalType } from '@/generated/prisma/enums';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import { RUBRIC_BOOLEAN_FUNCTIONS } from '@/server/metrics/constants/scoring/predefined-function';

export const rubricValueKind = (metric: {
  evalType: MetricEvalType;
  functionName: string | null;
}): RubricValueKind => {
  if (RUBRIC_BOOLEAN_FUNCTIONS.includes(metric.functionName ?? '')) {
    return RubricValueKind.boolean;
  }
  if (metric.evalType === MetricEvalType.binary) return RubricValueKind.boolean;
  if (metric.evalType === MetricEvalType.enum) return RubricValueKind.enum;
  return RubricValueKind.number;
};
