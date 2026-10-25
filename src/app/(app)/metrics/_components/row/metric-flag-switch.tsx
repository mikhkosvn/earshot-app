'use client';

import { Switch } from '@/components/ui/switch';
import type { MetricListItem } from '@/server/metrics/types';

import { type MetricFlag, MetricFlagLabel } from '../../_constants/metric-flag';
import { useUpdateMetricFlagsMutation } from '../../_hooks/mutations/row/use-update-metric-flags-mutation';

type MetricFlagSwitchProps = {
  metric: MetricListItem;
  flag: MetricFlag;
  locked: boolean;
};

export function MetricFlagSwitch({
  metric,
  flag,
  locked,
}: MetricFlagSwitchProps) {
  const updateFlags = useUpdateMetricFlagsMutation();

  return (
    <Switch
      aria-label={`${MetricFlagLabel[flag]} for ${metric.name}`}
      checked={metric[flag]}
      disabled={locked || updateFlags.isPending}
      onCheckedChange={(checked) =>
        updateFlags.mutate({ metricId: metric.id, [flag]: checked })
      }
    />
  );
}
