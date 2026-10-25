'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';
import { SLICE_DISPLAY_TYPES } from '@/server/dashboards/constants/plot/plot-display-type';

import type { PlotFormValues } from '../../_schemas/plot-form-schema';

const FIELD_ID = 'plot-show-percentages';

export function ShowPercentagesField() {
  const { control } = useFormContext<PlotFormValues>();
  const displayType = useWatch<PlotFormValues, 'displayType'>({
    name: 'displayType',
  });

  if (!SLICE_DISPLAY_TYPES.includes(displayType)) return null;

  return (
    <Controller
      name="showPercentages"
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-start gap-2">
          <Checkbox
            id={FIELD_ID}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Show percentages
            </FieldLabel>
            <FieldDescription className="text-xs">
              Display each value&apos;s share on the pie and in its legend.
            </FieldDescription>
          </FieldContent>
        </Field>
      )}
    />
  );
}
