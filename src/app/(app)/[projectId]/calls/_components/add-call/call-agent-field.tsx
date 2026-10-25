'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BotIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
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
import type { UploadCallLogsInput } from '@/server/call-logs/types';

import { CallService } from '../../_service';

const FIELD_ID = 'call-agent';

const selectedValue = (agentId: number) => {
  if (agentId > 0) return agentId;
  return null;
};

export function CallAgentField() {
  const projectId = useCurrentProjectId();
  const { control } = useFormContext<UploadCallLogsInput>();
  const { data: items } = useSuspenseQuery({
    ...CallService.getAgentOptionsQuery({ projectId }),
    select: (agents) =>
      agents.map((agent) => ({ value: agent.id, label: agent.name })),
  });

  return (
    <Controller
      name="agentId"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Agent
            </FieldLabel>
            <FieldDescription className="text-xs">
              Select the agent to add the calls *
            </FieldDescription>
          </div>
          <Select
            items={items}
            value={selectedValue(field.value)}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full text-xs">
              <BotIcon className="text-muted-foreground" />
              <SelectValue placeholder="Select agent" />
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
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
