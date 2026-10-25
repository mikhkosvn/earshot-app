import { Progress } from '@/components/ui/progress';
import type { ConversationMetricItem } from '@/server/conversations/types';

import { metricPercent } from '../../_utils/metric-display';

type MetricPercentValueProps = {
  metric: ConversationMetricItem;
};

export function MetricPercentValue({ metric }: MetricPercentValueProps) {
  const percent = metricPercent(metric);

  return (
    <span className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
      {percent}%
      <Progress
        value={percent}
        aria-label={`${metric.name} score`}
        className="w-20"
      />
    </span>
  );
}
