'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComparisonOperatorLabel } from '@/server/metrics/constants/comparison-operator-labels';

import { useRuleOperatorItems } from '../../_hooks/use-rule-operator-items';
import type { RubricFormValues } from '../../_schemas/rubric-form-schema';
import { RubricFieldLabel } from './rubric-field-label';

type RubricOperatorFieldProps = {
  index: number;
};

export function RubricOperatorField({ index }: RubricOperatorFieldProps) {
  const { control } = useFormContext<RubricFormValues>();
  const items = useRuleOperatorItems(index);
  const id = `rubric-rule-${index}-operator`;

  return (
    <Controller
      name={`rules.${index}.operator`}
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <RubricFieldLabel htmlFor={id}>Operator</RubricFieldLabel>
          <Select
            items={items}
            value={field.value}
            disabled={items.length === 0}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={id} className="w-full bg-background">
              <SelectValue>{ComparisonOperatorLabel[field.value]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
