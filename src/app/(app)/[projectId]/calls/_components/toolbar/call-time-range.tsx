'use client';

import { TimeRangePicker } from '@/components/common/time-range-picker/time-range-picker';

import { useCallTimeRangeParam } from '../../_hooks/call-params/use-call-time-range-param';

export function CallTimeRange() {
  const { from, to, setRange } = useCallTimeRangeParam();

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
