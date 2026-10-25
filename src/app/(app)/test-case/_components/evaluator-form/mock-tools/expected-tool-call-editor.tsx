'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Textarea } from '@/components/ui/textarea';
import type { MockToolOption } from '@/server/evaluators/types';

import { LabeledField } from '../../fields/labeled-field';
import { OptionSelect } from '../../fields/option-select';

interface ExpectedToolCallEditorProps {
  index: number;
  mockTools: readonly MockToolOption[];
  isOpen: boolean;
}

export function ExpectedToolCallEditor({
  index,
  mockTools,
  isOpen,
}: ExpectedToolCallEditorProps) {
  const { control } = useFormContext<EvaluatorFormValues>();
  const items = mockTools.map((tool) => ({ value: tool.id, label: tool.name }));
  const prefix = `evaluator-tool-call-${index}`;

  if (!isOpen) return null;

  return (
    <div className="flex flex-col gap-3 border-t p-3">
      <Controller
        name={`expectedToolCalls.${index}.mockToolId`}
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id={`${prefix}-tool`}
            label="Mock tool"
            error={fieldState.error}
          >
            <OptionSelect
              id={`${prefix}-tool`}
              items={items}
              value={field.value}
              onValueChange={(next) => {
                if (next === null) return;
                field.onChange(next);
              }}
              placeholder="Select a mock tool"
            />
          </LabeledField>
        )}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Controller
          name={`expectedToolCalls.${index}.input`}
          control={control}
          render={({ field, fieldState }) => (
            <LabeledField
              id={`${prefix}-input`}
              label="Input (JSON)"
              error={fieldState.error}
            >
              <Textarea
                {...field}
                id={`${prefix}-input`}
                aria-invalid={fieldState.invalid}
                className="min-h-24 font-mono text-xs md:text-xs"
              />
            </LabeledField>
          )}
        />
        <Controller
          name={`expectedToolCalls.${index}.output`}
          control={control}
          render={({ field, fieldState }) => (
            <LabeledField
              id={`${prefix}-output`}
              label="Output (JSON)"
              error={fieldState.error}
            >
              <Textarea
                {...field}
                id={`${prefix}-output`}
                aria-invalid={fieldState.invalid}
                className="min-h-24 font-mono text-xs md:text-xs"
              />
            </LabeledField>
          )}
        />
      </div>
    </div>
  );
}
