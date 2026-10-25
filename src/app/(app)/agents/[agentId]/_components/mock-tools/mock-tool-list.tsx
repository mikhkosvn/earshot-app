'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { WrenchIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { MockToolRow } from './mock-tool-row';

export function MockToolList() {
  const agentId = useAgentId();
  const { data: tools } = useSuspenseQuery(
    AgentService.getMockToolsQuery({ agentId }),
  );
  if (tools.length === 0) {
    return (
      <EmptyState
        icon={WrenchIcon}
        title="No mock tools configured"
        description="Add a tool to define mock input/output mappings"
        className="rounded-lg border"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {tools.map((tool) => (
        <MockToolRow key={tool.id} tool={tool} />
      ))}
    </ul>
  );
}
