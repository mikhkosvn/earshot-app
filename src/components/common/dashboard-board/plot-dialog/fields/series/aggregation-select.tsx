'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { PlotAggregationLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import { allowedAggregations } from '@/server/dashboards/constants/plot/field-value-kind';
import { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';

import { usePlotFieldKind } from '../../../_hooks/forms/use-plot-field-kind';
import type { PlotFormValues } from '../../../_schemas/plot-form-schema';
import { PlotSelect } from '../plot-select';

const aggregationSchema = z.enum(PlotAggregation);

export function AggregationSelect() {
  const { control } = useFormContext<PlotFormValues>();
  const { kind, isRating } = usePlotFieldKind();
  const allowed = allowedAggregations(kind, isRating);
  const items = Object.values(PlotAggregation).map((aggregation) => ({
    value: aggregation,
    label: PlotAggregationLabel[aggregation],
    disabled: !allowed.includes(aggregation),
  }));

  return (
    <Controller
      name="aggregation"
      control={control}
      render={({ field }) => (
        <PlotSelect
          id="plot-aggregation"
          label="Aggregation Function"
          items={items}
          value={field.value}
          onValueChange={(value) =>
            field.onChange(aggregationSchema.parse(value))
          }
        />
      )}
    />
  );
}
