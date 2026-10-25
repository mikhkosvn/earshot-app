import { Progress } from '@/components/ui/progress';

import { metricPercent } from '../../../_utils/runs/run-format';

interface RunMetricPercentProps {
  name: string;
  value: number;
}

export function RunMetricPercent({ name, value }: RunMetricPercentProps) {
  const percent = metricPercent(value);

  return (
    <span className="flex items-center gap-2">
      {percent}%
      <Progress value={percent} aria-label={`${name} score`} className="w-16" />
    </span>
  );
}
