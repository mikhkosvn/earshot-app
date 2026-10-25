'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BracesIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { VariableRow } from './variable-row';

export function VariableList() {
  const agentId = useAgentId();
  const { data: variables } = useSuspenseQuery(
    AgentService.getDynamicVariablesQuery({ agentId }),
  );
  if (variables.length === 0) {
    return (
      <EmptyState
        icon={BracesIcon}
        title="No dynamic variables defined"
        description="Add variables to generate scenario-specific values at call time"
        className="rounded-lg border"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {variables.map((variable) => (
        <VariableRow key={variable.id} variable={variable} />
      ))}
    </ul>
  );
}
