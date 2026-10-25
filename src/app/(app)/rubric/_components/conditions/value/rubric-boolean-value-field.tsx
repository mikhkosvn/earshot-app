'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { BOOLEAN_CHOICE_ITEMS } from '../../../_constants/boolean-choice';
import type { RubricFormValues } from '../../../_schemas/rubric-form-schema';
import {
  booleanChoiceOf,
  valueOfBooleanChoice,
} from '../../../_utils/boolean-choice-value';
import { RubricFieldLabel } from '../rubric-field-label';

type RubricBooleanValueFieldProps = {
  index: number;
};

export function RubricBooleanValueField({
  index,
}: RubricBooleanValueFieldProps) {
  const { control } = useFormContext<RubricFormValues>();
  const id = `rubric-rule-${index}-value`;

  return (
    <Controller
      name={`rules.${index}.value`}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <RubricFieldLabel htmlFor={id}>Value</RubricFieldLabel>
          <Select
            items={BOOLEAN_CHOICE_ITEMS}
            value={booleanChoiceOf(field.value)}
            onValueChange={(choice) => {
              if (choice === null) return;
              field.onChange(valueOfBooleanChoice(choice));
            }}
          >
            <SelectTrigger id={id} className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BOOLEAN_CHOICE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
