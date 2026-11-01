import type {
  ComparisonOperator,
  MetricCategory,
  MetricEvalType,
  MetricSubCategory,
  MetricType,
  PredefinedMetricBadge,
} from '@/generated/prisma/enums';

export type PredefinedMetricSeed = {
  code: string;
  slug: string | null;
  name: string;
  description: string;
  type: MetricType;
  evalType: MetricEvalType;
  functionName: string | null;
  customCode: string | null;
  category: MetricCategory;
  subCategory: MetricSubCategory | null;
  badge: PredefinedMetricBadge | null;
  audioEnabled: boolean;
  simulationEnabled: boolean;
  observabilityEnabled: boolean;
  configuration: Record<string, number> | null;
  editable: boolean;
  addToNewProjects: boolean;
  defaultDisplayOrder: number | null;
  rubricOperator: ComparisonOperator | null;
  rubricNumberValue: number | null;
  rubricBooleanValue: boolean | null;
  enumOptions: string[];
};
