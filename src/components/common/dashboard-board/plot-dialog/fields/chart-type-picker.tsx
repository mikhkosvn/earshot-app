'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  PlotDisplayTypeAriaLabel,
  PlotDisplayTypeLabel,
} from '@/server/dashboards/constants/labels/plot-option-labels';
import { KIND_DISPLAY_TYPES } from '@/server/dashboards/constants/plot/field-value-kind';
import { CHART_DISPLAY_TYPES } from '@/server/dashboards/constants/plot/plot-display-type';

import { usePlotFieldKind } from '../../_hooks/forms/use-plot-field-kind';
import { usePlotMetricsQuery } from '../../_hooks/queries/use-plot-metrics-query';
import type { PlotFormValues } from '../../_schemas/plot-form-schema';
import { changeDisplayType } from '../../_utils/plot-form-transitions';
import { PlotIcon } from '../../grid/plot-header/plot-icon';

export function ChartTypePicker() {
  const form = useFormContext<PlotFormValues>();
  const { data: metrics } = usePlotMetricsQuery();
  const { kind } = usePlotFieldKind();
  const allowed = KIND_DISPLAY_TYPES[kind];

  return (
    <Controller
      name="displayType"
      control={form.control}
      render={({ field }) => (
        <fieldset className="flex flex-col gap-1.5">
          <legend className="mb-1.5 text-xs font-medium">Chart Type</legend>
          <div className="grid grid-cols-5 gap-2">
            {CHART_DISPLAY_TYPES.map((displayType) => (
              <Button
                key={displayType}
                type="button"
                variant="outline"
                size="unstyled"
                aria-label={PlotDisplayTypeAriaLabel[displayType]}
                aria-pressed={field.value === displayType}
                disabled={!allowed.includes(displayType)}
                className="flex h-16 flex-col gap-1 text-xs aria-pressed:border-foreground aria-pressed:bg-muted"
                onClick={() => changeDisplayType(form, displayType, metrics)}
              >
                <PlotIcon displayType={displayType} className="size-5" />
                {PlotDisplayTypeLabel[displayType]}
              </Button>
            ))}
          </div>
        </fieldset>
      )}
    />
  );
}
