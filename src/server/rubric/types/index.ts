import type { z } from 'zod';

import type {
  ComparisonOperator,
  MetricEvalType,
} from '@/generated/prisma/enums';
import type { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import type {
  getRubricSchema,
  saveRubricSchema,
} from '@/server/rubric/schemas';

export type GetRubricInput = z.input<typeof getRubricSchema>;
export type SaveRubricInput = z.input<typeof saveRubricSchema>;

export type RubricRuleValue = boolean | number | string[] | null;

export interface RubricRuleView {
  metricId: number;
  operator: ComparisonOperator;
  value: RubricRuleValue;
}

export interface RubricMetricOption {
  id: number;
  name: string;
  evalType: MetricEvalType;
  kind: RubricValueKind;
  enumValues: string[];
}

export interface RubricView {
  rules: RubricRuleView[];
  metrics: RubricMetricOption[];
}
