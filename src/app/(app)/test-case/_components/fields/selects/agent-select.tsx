'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BotIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionSelect } from '../option-select';

interface AgentSelectProps {
  id?: string;
  value: number | null;
  onValueChange: (agentId: number | null) => void;
  invalid?: boolean;
  projectId?: number;
  className?: string;
}

export function AgentSelect({
  id,
  value,
  onValueChange,
  invalid,
  projectId,
  className,
}: AgentSelectProps) {
  const currentProjectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getAgentsQuery({
      projectId: projectId ?? currentProjectId,
    }),
    select: (agents) =>
      agents.map((agent) => ({ value: agent.id, label: agent.name })),
  });

  return (
    <OptionSelect
      id={id}
      items={items}
      value={value}
      onValueChange={onValueChange}
      placeholder="Select agent"
      icon={<BotIcon className="text-muted-foreground" />}
      invalid={invalid}
      className={className}
    />
  );
}
