'use client';

import { useIsMutating } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { MetricListItem } from '@/server/metrics/types';

import { useSamplingRateForm } from '../../_hooks/forms/use-sampling-rate-form';
import { MetricService } from '../../_service';
import { fromPercentInput, toPercentInput } from '../../_utils/sample-rate';

const FIELD_ID = 'metric-sampling-rate';

interface SamplingRateFormProps {
  metric: MetricListItem;
  onSaved: () => void;
}

export function SamplingRateForm({ metric, onSaved }: SamplingRateFormProps) {
  const { form, onSubmit } = useSamplingRateForm(metric, onSaved);
  const isSaving =
    useIsMutating({ mutationKey: MetricService.updateSampleRateMutationKey }) >
    0;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="p-3">
        <Controller
          name="sampleRate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor={FIELD_ID} className="text-xs">
                Sampling rate (%)
              </FieldLabel>
              <Input
                ref={field.ref}
                id={FIELD_ID}
                name={field.name}
                type="number"
                step="any"
                min={0}
                max={100}
                inputMode="decimal"
                placeholder="Project rate"
                defaultValue={toPercentInput(field.value)}
                aria-invalid={fieldState.invalid}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange(
                    fromPercentInput(
                      event.target.value,
                      event.target.valueAsNumber,
                    ),
                  )
                }
              />
              <FieldError errors={[fieldState.error]} className="text-xs" />
            </Field>
          )}
        />
      </div>
      <div className="flex justify-end gap-2 border-t p-3">
        <DialogClose
          render={<Button type="button" variant="outline" size="sm" />}
        >
          Cancel
        </DialogClose>
        <Button type="submit" size="sm" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
