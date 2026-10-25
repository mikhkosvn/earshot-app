'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { QUICK_SCHEDULES } from '../../_constants/quick-schedules';
import { joinCronParts } from '../../_utils/schedule/cron-parts';

const ITEMS = QUICK_SCHEDULES.map((schedule) => ({
  value: schedule.cron,
  label: schedule.label,
}));

const matchQuickSchedule = (expression: string) =>
  QUICK_SCHEDULES.find((schedule) => schedule.cron === expression)?.cron ??
  null;

type QuickScheduleSelectProps = {
  parts: string[];
  onSelect: (cron: string) => void;
};

export function QuickScheduleSelect({
  parts,
  onSelect,
}: QuickScheduleSelectProps) {
  return (
    <Select<string>
      items={ITEMS}
      value={matchQuickSchedule(joinCronParts(parts))}
      onValueChange={(cron) => {
        if (!cron) return;
        onSelect(cron);
      }}
    >
      <SelectTrigger
        aria-label="Quick Schedule"
        className="w-full justify-center bg-background"
      >
        <SelectValue placeholder="Quick Schedule" className="justify-center" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Common Schedules</SelectLabel>
          {ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
