'use client';

import { FilterIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlotOutcomeLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import { PlotOutcome } from '@/server/dashboards/constants/plot/plot-outcome';

import type { PlotFormValues } from '../_schemas/plot-form-schema';
import { PlotSelect } from './fields/plot-select';

const FILTERS_ITEM_VALUE = 'filters';

const outcomeSchema = z.enum(PlotOutcome);

const ITEMS = Object.values(PlotOutcome).map((outcome) => ({
  value: outcome,
  label: PlotOutcomeLabel[outcome],
}));

export function PlotFiltersSection() {
  const { control } = useFormContext<PlotFormValues>();

  return (
    <Accordion className="rounded-lg border">
      <AccordionItem value={FILTERS_ITEM_VALUE}>
        <AccordionTrigger className="h-7 items-center px-2.5 py-0 text-[0.8rem] hover:bg-muted hover:no-underline">
          <span className="flex items-center gap-1.5 [&_svg]:size-3.5">
            <FilterIcon />
            Filters
          </span>
        </AccordionTrigger>
        <AccordionContent className="border-t p-3">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
