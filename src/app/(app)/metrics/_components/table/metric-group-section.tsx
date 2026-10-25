'use client';

import { ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  type MetricGroup,
  MetricGroupLabel,
} from '../../_constants/metric-group';
import { useMetricList } from '../../_hooks/use-metric-list';
import { metricsOfGroup } from '../../_utils/metric-groups';
import type { MetricSelection } from '../metrics-view';
import { MetricGroupRows } from './metric-group-rows';

interface MetricGroupSectionProps extends MetricSelection {
  group: MetricGroup;
}

export function MetricGroupSection({
  group,
  selectedIds,
  onSelectedIdsChange,
}: MetricGroupSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const metrics = metricsOfGroup(useMetricList(), group);
  const label = MetricGroupLabel[group];

  return (
    <section aria-label={label} className="border-b last:border-b-0">
      <div className="flex items-center gap-1.5 px-3 pt-5 pb-2">
        <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          className="size-5 rounded-full"
          aria-label={`Toggle ${label}`}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((value) => !value)}
        >
          <ChevronUpIcon
            data-collapsed={collapsed}
            className="transition-transform data-[collapsed=true]:rotate-180"
          />
        </Button>
        <div className="h-px flex-1 bg-border" />
      </div>
      <MetricGroupRows
        metrics={metrics}
        collapsed={collapsed}
        selectedIds={selectedIds}
        onSelectedIdsChange={onSelectedIdsChange}
      />
    </section>
  );
}
