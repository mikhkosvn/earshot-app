'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Controller, type Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import type { PersonalityFormValues } from '@/server/personalities/types';

import {
  numberInputValue,
  sliderValue,
} from '../../../_utils/number-input-value';
import { SliderHelp } from './slider-help';

type SliderFieldProps = {
  name: Path<PersonalityFormValues>;
  label: string;
  icon: LucideIcon;
  min: number;
  max: number;
  step: number;
  suffix: string;
  rangeText: string;
  help?: ReactNode;
};

export function SliderField({
  name,
  label,
  icon: Icon,
  min,
  max,
  step,
  suffix,
  rangeText,
  help,
}: SliderFieldProps) {
  const { control } = useFormContext<PersonalityFormValues>();
  const id = `personality-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              <span className="text-[11px] text-sky-700 dark:text-sky-300">
                {rangeText}
              </span>
            </div>
            <div className="flex w-72 items-center gap-2 rounded-full border px-3 py-1">
              <Icon className="size-3.5 shrink-0 text-muted-foreground" />
              <Slider
                min={min}
                max={max}
                step={step}
                value={[Number(field.value ?? min)]}
                aria-label={label}
                onValueChange={(value) => field.onChange(sliderValue(value))}
              />
              <Input
                id={id}
                type="number"
                min={min}
                max={max}
                step={step}
                value={numberInputValue(field.value as number | null)}
                aria-invalid={fieldState.invalid}
                className="h-6 w-16 border-0 px-1 text-right text-xs shadow-none md:text-xs dark:bg-transparent"
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
              <span className="text-xs text-muted-foreground">{suffix}</span>
            </div>
          </div>
          <SliderHelp help={help} />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
