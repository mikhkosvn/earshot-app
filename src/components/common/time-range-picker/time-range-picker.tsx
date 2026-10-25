'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { timeRangeLabel } from '@/lib/time-range/time-range-label';

import { AbsoluteRangeForm } from './absolute-range-form';
import { QuickRangeList } from './quick-range-list';
import type { TimeRange } from './time-range';

type TimeRangePickerProps = TimeRange & {
  onApply: (range: TimeRange) => void;
};

export function TimeRangePicker({ from, to, onApply }: TimeRangePickerProps) {
  const [open, setOpen] = useState(false);

  const apply = (range: TimeRange) => {
    onApply(range);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="text-xs" />}
      >
        <CalendarIcon />
        {timeRangeLabel(from, to)}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(40rem,calc(100vw-2rem))] flex-row gap-0 p-0"
      >
        <AbsoluteRangeForm from={from} to={to} onApply={apply} />
        <QuickRangeList from={from} to={to} onApply={apply} />
      </PopoverContent>
    </Popover>
  );
}
