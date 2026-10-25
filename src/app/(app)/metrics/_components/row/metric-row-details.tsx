import type { MetricListItem } from '@/server/metrics/types';

import { MetricDependencies } from './metric-dependencies';

type MetricRowDetailsProps = {
  metric: MetricListItem;
  expanded: boolean;
};

export function MetricRowDetails({ metric, expanded }: MetricRowDetailsProps) {
  if (!expanded) return null;

  return (
    <div className="flex flex-col gap-2 border-t bg-muted/20 py-3 pr-3 pl-25 text-xs">
      <p className="whitespace-pre-wrap text-muted-foreground">
        {metric.description || 'No description'}
      </p>
      <MetricDependencies dependencies={metric.dependencies} />
    </div>
  );
}
