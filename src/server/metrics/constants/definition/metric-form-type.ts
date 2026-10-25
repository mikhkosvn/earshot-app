import { MetricType } from '@/generated/prisma/enums';

export const MetricFormType = {
  llm_judge: MetricType.llm_judge,
  custom_code: MetricType.custom_code,
} as const;

export type MetricFormType =
  (typeof MetricFormType)[keyof typeof MetricFormType];

export const MetricFormTypeLabel: Record<MetricFormType, string> = {
  [MetricFormType.llm_judge]: 'LLM Judge',
  [MetricFormType.custom_code]: 'Python',
};

export const FormEvaluationTrigger = {
  always: 'always',
  custom: 'custom',
} as const;

export type FormEvaluationTrigger =
  (typeof FormEvaluationTrigger)[keyof typeof FormEvaluationTrigger];
