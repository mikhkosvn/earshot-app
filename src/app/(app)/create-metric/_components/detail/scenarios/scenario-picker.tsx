'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { useScenarioOptions } from '../../../_hooks/use-scenario-options';
import type { CreateMetricFormInput } from '../../../_schemas/create-metric-form-schema';
import { ScenarioChecklist } from './scenario-checklist';

const SELECT_ALL_ID = 'metric-select-all-scenarios';

type ScenarioPickerProps = {
  isOn: boolean;
};

export function ScenarioPicker({ isOn }: ScenarioPickerProps) {
  const { control } = useFormContext<CreateMetricFormInput>();
  const scenarios = useScenarioOptions();
  const [search, setSearch] = useState('');

  if (!isOn) return null;

  return (
    <Controller
      name="scenarioIds"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Checkbox
              id={SELECT_ALL_ID}
              checked={
                scenarios.length > 0 && field.value.length === scenarios.length
              }
              disabled={scenarios.length === 0}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange(scenarios.map((scenario) => scenario.id));
                  return;
                }
                field.onChange([]);
              }}
            />
            <label htmlFor={SELECT_ALL_ID}>Select All Scenarios</label>
            <span className="text-xs text-muted-foreground">
              {field.value.length} selected
            </span>
          </div>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              aria-label="Search scenarios"
              placeholder="Search scenarios"
              className="bg-background pl-8"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <ScenarioChecklist
            scenarios={filterByName(scenarios, search)}
            value={field.value}
            onValueChange={field.onChange}
          />
        </div>
      )}
    />
  );
}
