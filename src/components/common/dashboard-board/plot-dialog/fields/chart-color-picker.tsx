'use client';

import { PaletteIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  PLOT_COLOR_VALUE,
  PlotColor,
  PlotColorLabel,
} from '@/server/dashboards/constants/plot/plot-color';

import type { PlotFormValues } from '../../_schemas/plot-form-schema';

export function ChartColorPicker() {
  const { control } = useFormContext<PlotFormValues>();

  return (
    <Controller
      name="color"
      control={control}
      render={({ field }) => (
        <fieldset className="flex flex-col gap-1.5">
          <legend className="mb-1.5 flex items-center gap-1.5 text-xs font-medium">
            <PaletteIcon className="size-3.5" />
            Chart Color
          </legend>
          <div className="flex flex-wrap gap-2">
            {Object.values(PlotColor).map((color) => (
              <Button
                key={color}
                type="button"
                variant="unstyled"
                size="unstyled"
                aria-label={PlotColorLabel[color]}
                aria-pressed={field.value === color}
                className="size-6 rounded-full ring-offset-2 ring-offset-background aria-pressed:ring-2 aria-pressed:ring-foreground"
                style={{ backgroundColor: PLOT_COLOR_VALUE[color] }}
                onClick={() => field.onChange(color)}
              />
            ))}
          </div>
        </fieldset>
      )}
    />
  );
}
