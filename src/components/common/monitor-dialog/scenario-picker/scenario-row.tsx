'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { MonitorScenarioOption } from '@/server/monitors/types';

type ScenarioRowProps = {
  scenario: MonitorScenarioOption;
  checked: boolean;
  onToggle: () => void;
};

export function ScenarioRow({ scenario, checked, onToggle }: ScenarioRowProps) {
  const id = `monitor-scenario-${scenario.id}`;

  return (
    <div className="flex items-center gap-2 rounded-md py-1 pr-2 pl-12 hover:bg-muted/60">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      <Label
        htmlFor={id}
        className="min-w-0 flex-1 cursor-pointer gap-1.5 font-normal"
      >
        <span className="truncate">{scenario.name}</span>
        <span className="shrink-0 text-xs text-muted-foreground">
          #{scenario.id}
        </span>
      </Label>
    </div>
  );
}
