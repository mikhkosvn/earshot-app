'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { ScenarioOption } from '@/server/metrics/types';

type ScenarioChecklistProps = {
  scenarios: ScenarioOption[];
  value: number[];
  onValueChange: (value: number[]) => void;
};

export function ScenarioChecklist({
  scenarios,
  value,
  onValueChange,
}: ScenarioChecklistProps) {
  if (scenarios.length === 0) {
    return (
      <p className="rounded-md border bg-background px-3 py-4 text-center text-sm text-muted-foreground">
        No scenarios
      </p>
    );
  }

  return (
    <ul className="flex max-h-60 flex-col overflow-y-auto rounded-md border bg-background">
      {scenarios.map((scenario) => (
        <li
          key={scenario.id}
          className="flex items-center gap-2 border-b px-3 py-2 text-sm last:border-b-0"
        >
          <Checkbox
            id={`metric-scenario-${scenario.id}`}
            checked={value.includes(scenario.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                onValueChange([...value, scenario.id]);
                return;
              }
              onValueChange(value.filter((id) => id !== scenario.id));
            }}
          />
          <label htmlFor={`metric-scenario-${scenario.id}`}>
            {scenario.name}
          </label>
        </li>
      ))}
    </ul>
  );
}
