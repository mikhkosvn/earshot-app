'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAgentOptions } from '../_hooks/use-agent-options';

const FIELD_ID = 'improve-agent';

type ImproveAgentSelectProps = {
  value: number | null;
  onValueChange: (agentId: number) => void;
};

export function ImproveAgentSelect({
  value,
  onValueChange,
}: ImproveAgentSelectProps) {
  const agents = useAgentOptions();
  const items = agents.map((agent) => ({ value: agent.id, label: agent.name }));

  if (agents.length === 0) {
    return (
      <p className="flex-1 text-sm text-muted-foreground">
        Add an agent to this project first.
      </p>
    );
  }

  return (
    <Field className="flex-1 gap-1.5">
      <FieldLabel htmlFor={FIELD_ID}>Agent</FieldLabel>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => {
          if (next === null) return;
          onValueChange(next);
        }}
      >
        <SelectTrigger id={FIELD_ID} className="w-full">
          <SelectValue placeholder="Select an agent" />
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
  );
}
