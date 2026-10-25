'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useAgentOptions } from '@/components/common/metric-form/_hooks/use-agent-options';
import { MultiPick } from '@/components/common/metric-form/multi-pick/multi-pick';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import { QUICK_AGENTS_HELP } from '../../_constants/quick-mode-text';
import type { QuickMetricFormInput } from '../../_schemas/quick-metric-form-schema';

const FIELD_ID = 'quick-metric-agents';

export function QuickAgentsField() {
  const { control } = useFormContext<QuickMetricFormInput>();
  const agents = useAgentOptions();
  const items = agents.map((agent) => ({ value: agent.id, label: agent.name }));

  return (
    <Controller
      name="agentIds"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={FIELD_ID}>
            <span>
              Agents <span className="text-destructive">*</span>
            </span>
          </FieldLabel>
          <MultiPick
            id={FIELD_ID}
            label="Agents"
            placeholder="Select agents"
            items={items}
            value={field.value}
            invalid={fieldState.invalid}
            onValueChange={field.onChange}
          />
          <FieldDescription className="text-xs">
            {QUICK_AGENTS_HELP}
          </FieldDescription>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
