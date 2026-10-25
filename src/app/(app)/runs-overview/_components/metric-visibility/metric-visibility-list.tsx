'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { useRunsOverviewParams } from '../../_hooks/use-runs-overview-params';
import { useRunsOverviewQuery } from '../../_hooks/use-runs-overview-query';

const hiddenValue = (hidden: number[]) => {
  if (hidden.length === 0) return null;
  return hidden;
};

export function MetricVisibilityList() {
  const { data: overview } = useRunsOverviewQuery();
  const [{ hidden }, setParams] = useRunsOverviewParams();

  if (overview.metricSummary.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No metrics available
      </p>
    );
  }

  return (
    <ul className="flex max-h-96 flex-col gap-2 overflow-y-auto">
      {overview.metricSummary.map((metric) => {
        const id = `metric-visibility-${metric.metricId}`;
        return (
          <li key={metric.metricId} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={!hidden.includes(metric.metricId)}
              onCheckedChange={(checked) => {
                const next = hidden.filter((item) => item !== metric.metricId);
                if (checked !== true) next.push(metric.metricId);
                void setParams({ hidden: hiddenValue(next) });
              }}
            />
            <Label htmlFor={id} className="text-sm font-normal">
              {metric.name}
            </Label>
          </li>
        );
      })}
    </ul>
  );
}
