import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TileRun } from '@/server/results/types';

import { metricValueText } from '../../../_utils/number-format';

const toneClass = (run: TileRun) => {
  if (run.passed === true) return 'border-green-200 bg-green-50 text-green-700';
  if (run.passed === false) return 'border-red-200 bg-red-50 text-red-700';
  return 'border-border';
};

type MetricRunScoreProps = {
  run: TileRun;
};

export function MetricRunScore({ run }: MetricRunScoreProps) {
  return (
    <Badge variant="outline" className={cn('rounded-md', toneClass(run))}>
      Score: {metricValueText(run.value)}
    </Badge>
  );
}
