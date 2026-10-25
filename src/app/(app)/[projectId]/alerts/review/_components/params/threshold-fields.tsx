'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThresholdOperator } from '@/generated/prisma/enums';
import { ThresholdOperatorLabel } from '@/server/alerts/constants/threshold-operator-labels';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';
import { NumberParamField } from './number-param-field';
import { ThresholdValueFields } from './threshold-value-fields';

const FIELD_ID = 'alert-threshold-operator';

const items = Object.values(ThresholdOperator).map((operator) => ({
  value: operator,
  label: ThresholdOperatorLabel[operator],
}));

export function ThresholdFields() {
  const { control } = useFormContext<EditAlertFormValues>();

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-3">
      <Controller
        name="params.thresholdOperator"
        control={control}
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Condition
            </FieldLabel>
            <Select
              items={items}
              value={field.value}
              onValueChange={(value) => {
                if (value === null) return;
                field.onChange(value);
              }}
            >
              <SelectTrigger id={FIELD_ID} className="w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="text-xs"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <ThresholdValueFields />
      <div className="grid grid-cols-2 gap-2">
        <NumberParamField name="params.minBreaches" label="Min breaches" />
        <NumberParamField name="params.windowSize" label="Window (calls)" />
      </div>
    </div>
  );
}
