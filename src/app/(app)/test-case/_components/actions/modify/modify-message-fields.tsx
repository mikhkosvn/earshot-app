'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ModifyEvaluatorsFieldsValues } from '@/server/evaluators/types';

import {
  MAX_DURATION_HELP,
  MAX_DURATION_PLACEHOLDER,
} from '../../../_constants/evaluator-help-text';
import { LabeledField } from '../../fields/labeled-field';
import { NullableNumberInput } from '../../fields/nullable-number-input';
import { PhoneNumberSelect } from '../../fields/selects/phone-number-select';

export function ModifyMessageFields() {
  const { control } = useFormContext<ModifyEvaluatorsFieldsValues>();

  return (
    <>
      <Controller
        name="firstMessage"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-first-message"
            label="First Message"
            description="Override the first message for all selected scenarios"
          >
            <Textarea
              {...field}
              id="modify-first-message"
              placeholder="Enter first message..."
              className="min-h-20 bg-background"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="sendEmptyFirstMessage"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id="modify-empty-first-message"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            <Label htmlFor="modify-empty-first-message">
              Send empty first message
            </Label>
          </div>
        )}
      />
      <Controller
        name="maxDurationSeconds"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="modify-max-duration"
            label="Max Call Duration (seconds)"
            description={MAX_DURATION_HELP}
            error={fieldState.error}
          >
            <NullableNumberInput
              id="modify-max-duration"
              value={field.value}
              onValueChange={field.onChange}
              placeholder={MAX_DURATION_PLACEHOLDER}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="phoneNumberId"
        control={control}
        render={({ field }) => (
          <LabeledField id="modify-phone-number" label="Phone Number">
            <PhoneNumberSelect
              id="modify-phone-number"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select a phone number"
            />
          </LabeledField>
        )}
      />
    </>
  );
}
