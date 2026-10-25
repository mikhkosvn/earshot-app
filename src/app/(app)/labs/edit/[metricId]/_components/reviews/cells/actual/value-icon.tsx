import { CheckIcon, XIcon } from 'lucide-react';

import type { MetricValue } from '@/server/metrics/types';

type ValueIconProps = {
  value: MetricValue;
};

export function ValueIcon({ value }: ValueIconProps) {
  if (value === true) return <CheckIcon className="size-4" />;
  if (value === false) return <XIcon className="size-4" />;
  return null;
}
