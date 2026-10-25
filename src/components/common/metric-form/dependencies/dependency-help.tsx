'use client';

import { MetricType } from '@/generated/prisma/enums';

import {
  JUDGE_DEPENDENCY_HELP,
  PYTHON_DEPENDENCY_HELP,
} from '../_constants/metric-form-text';
import { useMetricFormType } from '../_hooks/use-metric-form-type';

export function DependencyHelp() {
  const type = useMetricFormType();

  if (type === MetricType.custom_code) return PYTHON_DEPENDENCY_HELP;
  return JUDGE_DEPENDENCY_HELP;
}
