'use client';

import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PlotOutcomeLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import { PlotOutcome } from '@/server/dashboards/constants/plot/plot-outcome';

import type { PlotFormValues } from '../_schemas/plot-form-schema';
import { PlotSelect } from './fields/plot-select';

const outcomeSchema = z.enum(PlotOutcome);

const ITEMS = Object.values(PlotOutcome).map((outcome) => ({
  value: outcome,
  label: PlotOutcomeLabel[outcome],
}));

export function PlotFiltersSection() {
  const { control } = useFormContext<PlotFormValues>();

  return (
    <Collapsible className="rounded-lg border">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="group w-full justify-between"
          />
        }
      >
        <span className="flex items-center gap-1.5">
          <FilterIcon />
          Filters
        </span>
        <ChevronDownIcon className="transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t p-3">
        <Controller
          name="outcome"
          control={control}
          render={({ field }) => (
            <PlotSelect
              id="plot-outcome"
              label="Outcome"
              items={ITEMS}
              value={field.value}
              onValueChange={(value) =>
                field.onChange(outcomeSchema.parse(value))
              }
            />
          )}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Keep only the successful or the failed items in this plot.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
