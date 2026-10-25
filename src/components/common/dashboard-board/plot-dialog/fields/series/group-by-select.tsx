'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import type { DashboardSource } from '@/generated/prisma/enums';
import { WidgetGroupByLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import {
  SOURCE_GROUP_BYS,
  WidgetGroupBy,
} from '@/server/dashboards/constants/plot/widget-group-by';

import type { PlotFormValues } from '../../../_schemas/plot-form-schema';
import { PlotSelect } from '../plot-select';

type GroupBySelectProps = {
  source: DashboardSource;
};

const groupBySchema = z.enum(WidgetGroupBy);

export function GroupBySelect({ source }: GroupBySelectProps) {
  const { control } = useFormContext<PlotFormValues>();
  const items = SOURCE_GROUP_BYS[source].map((groupBy) => ({
    value: groupBy,
    label: WidgetGroupByLabel[groupBy],
  }));

  return (
    <Controller
      name="groupBy"
      control={control}
      render={({ field }) => (
        <PlotSelect
          id="plot-group-by"
          label="Group By"
          items={items}
          value={field.value}
          onValueChange={(value) => field.onChange(groupBySchema.parse(value))}
        />
      )}
    />
  );
}
