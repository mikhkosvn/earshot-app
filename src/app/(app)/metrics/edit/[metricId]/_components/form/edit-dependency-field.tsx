'use client';

import { useMetricFormType } from '@/components/common/metric-form/_hooks/use-metric-form-type';
import { DependencyField } from '@/components/common/metric-form/dependencies/dependency-field';
import { MetricType } from '@/generated/prisma/enums';

export function EditDependencyField() {
  const type = useMetricFormType();

  if (type === MetricType.custom_code) return null;

  return <DependencyField />;
}
