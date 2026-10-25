'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../_service';
import { FilterOptionList } from './filter-option-list';

interface AgentFilterPanelProps {
  value: readonly number[];
  onValueChange: (agentIds: number[]) => void;
}

export function AgentFilterPanel({
  value,
  onValueChange,
}: AgentFilterPanelProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...EvaluatorService.getAgentsQuery({ projectId }),
    select: (agents) =>
      agents.map((agent) => ({ value: agent.id, label: agent.name })),
  });

  return (
    <FilterOptionList
      name="agents"
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
