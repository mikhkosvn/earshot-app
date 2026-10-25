import { Badge } from '@/components/ui/badge';
import { MetricEvaluationStatusLabel } from '@/server/conversations/constants/metric-evaluation-status-labels';
import type { ConversationMetricItem } from '@/server/conversations/types';

import { MetricDisplayKind } from '../../_constants/metric-display';
import {
  metricDisplayKind,
  metricNumberText,
} from '../../_utils/metric-display';
import { MetricPercentValue } from './metric-percent-value';

interface MetricValueProps {
  metric: ConversationMetricItem;
}

export function MetricValue({ metric }: MetricValueProps) {
  const kind = metricDisplayKind(metric);
  if (kind === MetricDisplayKind.status) {
    return (
      <span className="text-xs text-muted-foreground">
        {MetricEvaluationStatusLabel[metric.status]}
      </span>
    );
  }
  if (kind === MetricDisplayKind.none) {
    return <Badge variant="secondary">NONE</Badge>;
  }
  if (kind === MetricDisplayKind.empty) {
    return <span className="text-sm text-muted-foreground">--</span>;
  }
  if (kind === MetricDisplayKind.passed) {
    return (
      <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 text-sm text-emerald-600 dark:text-emerald-400">
        Passed
      </span>
    );
  }
  if (kind === MetricDisplayKind.failed) {
    return (
      <span className="rounded-sm bg-destructive/10 px-2 py-0.5 text-sm text-destructive">
        Failed
      </span>
    );
  }
  if (kind === MetricDisplayKind.percent) {
    return <MetricPercentValue metric={metric} />;
  }
  return (
    <span className="max-w-40 truncate text-sm text-muted-foreground tabular-nums">
      {metricNumberText(metric.value)}
    </span>
  );
}
