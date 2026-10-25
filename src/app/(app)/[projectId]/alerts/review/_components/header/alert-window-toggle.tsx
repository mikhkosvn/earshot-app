'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ALERT_WINDOW_OPTIONS,
  isAlertWindowHours,
} from '@/server/alerts/constants/alert-window';

import { useAlertWindow } from '../../_hooks/params/use-alert-window';

export function AlertWindowToggle() {
  const { hours, setHours } = useAlertWindow();

  return (
    <ToggleGroup
      value={[String(hours)]}
      onValueChange={(values) => {
        const next = Number(values.at(-1));
        if (!isAlertWindowHours(next)) return;
        void setHours(next);
      }}
      spacing={0}
      size="sm"
      aria-label="Time window"
      className="rounded-md bg-muted p-0.5"
    >
      {ALERT_WINDOW_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.hours}
          value={String(option.hours)}
          className="h-6 px-2.5 text-xs font-medium data-pressed:bg-foreground data-pressed:text-background"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
