import { Progress } from '@/components/ui/progress';
import type { ConversationMetricItem } from '@/server/conversations/types';

import { metricPercent } from '../../_utils/metric-display';

interface MetricPercentValueProps {
  metric: ConversationMetricItem;
}

export function MetricPercentValue({ metric }: MetricPercentValueProps) {
  const percent = metricPercent(metric);

  return (
    <span className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
      {percent}%
      <Progress
        value={percent}
        aria-label={`${metric.name} score`}
        className="w-20 **:data-[slot=progress-indicator]:bg-emerald-500"
      />
    </span>
  );
}
