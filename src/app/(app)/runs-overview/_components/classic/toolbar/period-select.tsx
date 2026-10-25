'use client';

import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WidgetTimePeriodLabel } from '@/server/dashboards/constants/labels/widget-time-period-labels';
import { OVERVIEW_PERIODS } from '@/server/runs-overview/constants';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';

const periodSchema = z.enum(OVERVIEW_PERIODS);

const ITEMS = OVERVIEW_PERIODS.map((period) => ({
  value: period,
  label: WidgetTimePeriodLabel[period],
}));

export function PeriodSelect() {
  const [{ period }, setParams] = useRunsOverviewParams();

  return (
    <Select
      items={ITEMS}
      value={period}
      onValueChange={(next) => {
        const parsed = periodSchema.safeParse(next);
        if (!parsed.success) return;
        void setParams({ period: parsed.data });
      }}
    >
      <SelectTrigger size="sm" aria-label="Period" className="text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
