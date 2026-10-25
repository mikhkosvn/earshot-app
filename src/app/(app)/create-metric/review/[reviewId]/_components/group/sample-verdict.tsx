import { cn } from '@/lib/utils';
import type { MetricValue } from '@/server/metrics/types';

import {
  metricValueClassName,
  metricValueText,
} from '../../_utils/metric-value-text';

interface SampleVerdictProps {
  value: MetricValue;
}

export function SampleVerdict({ value }: SampleVerdictProps) {
  return (
    <span className={cn('text-sm font-medium', metricValueClassName(value))}>
      {metricValueText(value)}
    </span>
  );
}
