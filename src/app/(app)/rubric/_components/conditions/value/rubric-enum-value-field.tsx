'use client';

import { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import { Field, FieldError } from '@/components/ui/field';

import { useRuleEnumValues } from '../../../_hooks/use-rule-enum-values';
import type { RubricFormValues } from '../../../_schemas/rubric-form-schema';
import { enumRuleValue, enumSelection } from '../../../_utils/enum-rule-value';
import { RubricFieldLabel } from '../rubric-field-label';

interface RubricEnumValueFieldProps {
  index: number;
}

export function RubricEnumValueField({ index }: RubricEnumValueFieldProps) {
  const { control } = useFormContext<RubricFormValues>();
  const enumValues = useRuleEnumValues(index);
  const anchor = useComboboxAnchor();
  const id = `rubric-rule-${index}-value`;

  return (
    <Controller
      name={`rules.${index}.value`}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <RubricFieldLabel htmlFor={id}>Value</RubricFieldLabel>
          <Combobox<string, true>
            multiple
            items={enumValues}
            value={enumSelection(field.value)}
            onValueChange={(selection) =>
              field.onChange(enumRuleValue(selection))
            }
          >
            <ComboboxChips ref={anchor} className="w-full bg-background">
              <ComboboxValue>
                {(values: string[]) => (
                  <Fragment>
                    {values.map((value) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      id={id}
                      placeholder="None"
                      aria-invalid={fieldState.invalid}
                    />
                  </Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No value found.</ComboboxEmpty>
              <ComboboxList>
                {(value: string) => (
                  <ComboboxItem key={value} value={value}>
                    {value}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
