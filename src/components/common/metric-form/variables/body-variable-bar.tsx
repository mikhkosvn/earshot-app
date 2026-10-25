'use client';

import { MetricType } from '@/generated/prisma/enums';

import { ROLE_NOTE } from '../_constants/metric-form-text';
import {
  JUDGE_VARIABLE_SET,
  PYTHON_VARIABLE_SET,
} from '../_constants/variable-sets';
import { useMetricFormType } from '../_hooks/use-metric-form-type';
import { VariableBar } from './variable-bar';

export function BodyVariableBar() {
  const type = useMetricFormType();

  if (type === MetricType.custom_code) {
    return <VariableBar set={PYTHON_VARIABLE_SET} />;
  }

  return (
    <div className="flex flex-col gap-2">
      <VariableBar set={JUDGE_VARIABLE_SET} />
      <p className="text-xs">{ROLE_NOTE}</p>
    </div>
  );
}
