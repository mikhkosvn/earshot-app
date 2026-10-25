'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { StartMetricGenerationInput } from '@/server/metrics/types';

import { MetricService } from '../../_service';

const FIELD_ID = 'generate-metrics-agent';

export function GenerateAgentField() {
  const projectId = useCurrentProjectId();
  const { control } = useFormContext<StartMetricGenerationInput>();
  const { data: agents } = useSuspenseQuery({
    ...MetricService.getAgentOptionsQuery({ projectId }),
    select: (options) =>
      options.map((agent) => ({ value: agent.id, label: agent.name })),
  });

  return (
    <Controller
      name="agentId"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Select Agent
          </FieldLabel>
          <Select
            items={agents}
            value={field.value ?? null}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="h-9 w-full text-xs">
              <SelectValue placeholder="No agents" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem
                  key={agent.value}
                  value={agent.value}
                  className="text-xs"
                >
                  {agent.label}
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
