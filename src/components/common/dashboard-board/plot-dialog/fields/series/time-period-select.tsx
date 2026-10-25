'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { WidgetTimePeriod } from '@/generated/prisma/enums';
import { PlotTimePeriodLabel } from '@/server/dashboards/constants/labels/plot-option-labels';

import type { PlotFormValues } from '../../../_schemas/plot-form-schema';
import { PlotSelect } from '../plot-select';

const periodSchema = z.enum(WidgetTimePeriod);

const ITEMS = Object.values(WidgetTimePeriod).map((period) => ({
  value: period,
  label: PlotTimePeriodLabel[period],
}));

export function TimePeriodSelect() {
  const { control } = useFormContext<PlotFormValues>();

  return (
    <Controller
      name="timePeriod"
      control={control}
      render={({ field }) => (
        <PlotSelect
          id="plot-time-period"
          label="Time Period"
          items={ITEMS}
          value={field.value}
          onValueChange={(value) => field.onChange(periodSchema.parse(value))}
        />
      )}
    />
  );
}
