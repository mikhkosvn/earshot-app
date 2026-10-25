'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { AlertType } from '@/generated/prisma/enums';
import {
  SENSITIVITY_PRESET_ORDER,
  TREND_PRESET_DESCRIPTION,
  TREND_PRESETS,
} from '@/server/alerts/constants/alert-presets';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';
import { trendPresetOf } from '../../_utils/alert-params';
import { type PresetOption, PresetCards } from './preset-cards';

const options: PresetOption[] = SENSITIVITY_PRESET_ORDER.map((preset) => {
  const values = TREND_PRESETS[preset];
  return {
    preset,
    description: TREND_PRESET_DESCRIPTION[preset],
    detail: `std=${values.stdMultiplier} · α=${values.ewmaAlpha} · n=${values.windowSize}`,
  };
});

export function TrendPresetField() {
  const { control } = useFormContext<EditAlertFormValues>();

  return (
    <Controller
      name="params"
      control={control}
      render={({ field }) => {
        if (field.value.type !== AlertType.significant_change) return <></>;
        const params = field.value;
        return (
          <PresetCards
            value={trendPresetOf(params)}
            options={options}
            onChange={(preset) =>
              field.onChange({ ...params, ...TREND_PRESETS[preset] })
            }
          />
        );
      }}
    />
  );
}
