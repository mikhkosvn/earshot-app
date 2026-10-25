'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';

import { APPLY_SCENARIOS_HELP } from '../../../_constants/quick-mode-text';
import type { CreateMetricFormInput } from '../../../_schemas/create-metric-form-schema';
import { ScenarioPicker } from './scenario-picker';

const FIELD_ID = 'metric-apply-scenarios';

export function ApplyScenariosCard() {
  const { setValue } = useFormContext<CreateMetricFormInput>();
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor={FIELD_ID} className="text-sm font-medium">
            Apply to existing scenarios
          </label>
          <p className="text-xs text-muted-foreground">
            {APPLY_SCENARIOS_HELP}
          </p>
        </div>
        <Switch
          id={FIELD_ID}
          checked={isOn}
          onCheckedChange={(checked) => {
            setIsOn(checked);
            if (checked) return;
            setValue('scenarioIds', [], { shouldDirty: true });
          }}
        />
      </div>
      <ScenarioPicker isOn={isOn} />
    </div>
  );
}
