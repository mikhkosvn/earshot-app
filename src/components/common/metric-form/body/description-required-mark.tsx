'use client';

import { MetricType } from '@/generated/prisma/enums';

import { useMetricFormType } from '../_hooks/use-metric-form-type';

export function DescriptionRequiredMark() {
  const type = useMetricFormType();

  if (type !== MetricType.llm_judge) return null;

  return <span className="text-destructive">*</span>;
}
