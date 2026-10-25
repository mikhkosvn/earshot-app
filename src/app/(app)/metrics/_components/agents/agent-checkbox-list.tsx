'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Checkbox } from '@/components/ui/checkbox';

import { MetricService } from '../../_service';
import { toggleItem } from '../../_utils/toggle-item';

type AgentCheckboxListProps = {
  value: number[];
  onChange: (agentIds: number[]) => void;
};

export function AgentCheckboxList({ value, onChange }: AgentCheckboxListProps) {
  const projectId = useCurrentProjectId();
  const { data: agents } = useSuspenseQuery(
    MetricService.getAgentOptionsQuery({ projectId }),
  );

  if (agents.length === 0) {
    return (
      <p className="rounded-lg border px-3 py-4 text-xs text-muted-foreground">
        No agents
      </p>
    );
  }

  return (
    <div className="flex max-h-64 flex-col divide-y overflow-y-auto rounded-lg border">
      {agents.map((agent) => (
        <label
          key={agent.id}
          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-xs hover:bg-muted/50"
        >
          <Checkbox
            checked={value.includes(agent.id)}
            onCheckedChange={(checked) =>
              onChange(toggleItem(value, agent.id, checked))
            }
          />
          <span className="truncate">{agent.name}</span>
        </label>
      ))}
    </div>
  );
}
