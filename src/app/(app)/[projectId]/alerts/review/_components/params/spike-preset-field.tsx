'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { AlertType } from '@/generated/prisma/enums';
import {
  SENSITIVITY_PRESET_ORDER,
  SPIKE_PRESET_DESCRIPTION,
  SPIKE_PRESETS,
} from '@/server/alerts/constants/alert-presets';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';
import { spikePresetOf } from '../../_utils/alert-params';
import { type PresetOption, PresetCards } from './preset-cards';

const options: PresetOption[] = SENSITIVITY_PRESET_ORDER.map((preset) => {
  const values = SPIKE_PRESETS[preset];
  return {
    preset,
    description: SPIKE_PRESET_DESCRIPTION[preset],
    detail: `≥${values.minCount} in ${values.windowHours}h · ${values.multiplier}× baseline`,
  };
});

export function SpikePresetField() {
  const { control } = useFormContext<EditAlertFormValues>();

  return (
    <Controller
      name="params"
      control={control}
      render={({ field }) => {
        if (field.value.type !== AlertType.insight_uptick) return <></>;
        const params = field.value;
        return (
          <PresetCards
            value={spikePresetOf(params)}
            options={options}
            onChange={(preset) =>
              field.onChange({ ...params, ...SPIKE_PRESETS[preset] })
            }
          />
        );
      }}
    />
  );
}
