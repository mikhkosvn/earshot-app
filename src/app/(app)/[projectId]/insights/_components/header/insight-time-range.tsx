'use client';

import { TimeRangePicker } from '@/components/common/time-range-picker/time-range-picker';

import { useInsightRange } from '../../_hooks/params/use-insight-range';

export function InsightTimeRange() {
  const { from, to, setRange } = useInsightRange();

  return (
    <TimeRangePicker
      from={from}
      to={to}
      onApply={(range) => {
        void setRange(range);
      }}
    />
  );
}
