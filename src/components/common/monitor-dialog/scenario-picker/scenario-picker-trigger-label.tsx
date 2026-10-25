'use client';

import { useMonitorScenarios } from '../_hooks/use-monitor-scenarios';
import { SelectionChips } from '../form/selection-chips';

interface ScenarioPickerTriggerLabelProps {
  value: readonly number[];
}

export function ScenarioPickerTriggerLabel({
  value,
}: ScenarioPickerTriggerLabelProps) {
  const tree = useMonitorScenarios();
  const labels = tree.folders
    .flatMap((folder) => folder.scenarios)
    .filter((scenario) => value.includes(scenario.id))
    .map((scenario) => scenario.name);

  return (
    <SelectionChips
      labels={labels}
      placeholder="Select scenarios from folders"
    />
  );
}
