'use client';

import { useMetricFormType } from '@/components/common/metric-form/_hooks/use-metric-form-type';
import { MetricType } from '@/generated/prisma/enums';

import { LabCodeField } from './lab-code-field';
import { LabDescriptionField } from './lab-description-field';

export function LabBodyField() {
  const type = useMetricFormType();

  if (type === MetricType.custom_code) return <LabCodeField />;
  return <LabDescriptionField />;
}
