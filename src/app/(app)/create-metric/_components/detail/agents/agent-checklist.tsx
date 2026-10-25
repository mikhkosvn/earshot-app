'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { AgentOption } from '@/server/metrics/types';

interface AgentChecklistProps {
  agents: readonly AgentOption[];
  value: readonly number[];
  onValueChange: (value: number[]) => void;
}

export function AgentChecklist({
  agents,
  value,
  onValueChange,
}: AgentChecklistProps) {
  if (agents.length === 0) {
    return (
      <p className="rounded-md border px-3 py-4 text-center text-sm text-muted-foreground">
        No agents
      </p>
    );
  }

  return (
    <ul className="flex max-h-60 flex-col overflow-y-auto rounded-md border">
      {agents.map((agent) => (
        <li
          key={agent.id}
          className="flex items-center gap-2 border-b px-3 py-2 text-sm last:border-b-0"
        >
          <Checkbox
            id={`metric-agent-${agent.id}`}
            checked={value.includes(agent.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                onValueChange([...value, agent.id]);
                return;
              }
              onValueChange(value.filter((id) => id !== agent.id));
            }}
          />
          <label htmlFor={`metric-agent-${agent.id}`}>{agent.name}</label>
        </li>
      ))}
    </ul>
  );
}
