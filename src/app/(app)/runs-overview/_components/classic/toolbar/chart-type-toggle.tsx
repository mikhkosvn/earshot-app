'use client';

import { ChartColumnIcon, TrendingUpIcon } from 'lucide-react';
import { z } from 'zod';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  OverviewChartType,
  OverviewChartTypeLabel,
} from '@/server/runs-overview/constants';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';

const chartTypeSchema = z.enum(OverviewChartType);

export function ChartTypeToggle() {
  const [{ chartType }, setParams] = useRunsOverviewParams();

  return (
    <ToggleGroup
      aria-label="Chart type"
      variant="outline"
      size="sm"
      spacing={0}
      value={[chartType]}
      onValueChange={(values) => {
        const next = chartTypeSchema.safeParse(values[0]);
        if (!next.success) return;
        void setParams({ chartType: next.data });
      }}
    >
      <ToggleGroupItem value={OverviewChartType.line} className="text-xs">
        <TrendingUpIcon />
        {OverviewChartTypeLabel[OverviewChartType.line]}
      </ToggleGroupItem>
      <ToggleGroupItem value={OverviewChartType.bar} className="text-xs">
        <ChartColumnIcon />
        {OverviewChartTypeLabel[OverviewChartType.bar]}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
