'use client';

import { TimeRangePicker } from '@/components/common/time-range-picker/time-range-picker';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';

export function OverviewTimeRange() {
  const [{ from, to }, setParams] = useRunsOverviewParams();

  return (
    <TimeRangePicker
      from={from}
      to={to}
      onApply={(range) => {
        void setParams(range);
      }}
    />
  );
}
