'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { triggerItems } from '@/components/common/metric-form/_utils/trigger-items';
import { CustomTriggerFields } from '@/components/common/metric-form/trigger/custom-trigger-fields';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';

const FIELD_ID = 'lab-evaluation-trigger';

export function LabTriggerField() {
  const { control } = useFormContext<LabMetricFormInput>();

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="evaluationTrigger"
        control={control}
        render={({ field, fieldState }) => {
          const items = triggerItems(field.value);
          return (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <div className="flex flex-col gap-0.5">
                <FieldLabel htmlFor={FIELD_ID}>Evaluation Trigger</FieldLabel>
                <FieldDescription className="text-xs">
                  Choose when this metric should be evaluated
                </FieldDescription>
              </div>
              <Select
                items={items}
                value={field.value}
                disabled={field.disabled}
                onValueChange={(value) => {
                  if (value === null) return;
                  field.onChange(value);
                }}
              >
                <SelectTrigger id={FIELD_ID} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          );
        }}
      />
      <CustomTriggerFields />
    </div>
  );
}
