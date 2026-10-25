'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { DatabaseIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../../_hooks/use-agent-id';
import { ConnectorRow } from './connector-row';

export function ConnectorList() {
  const agentId = useAgentId();
  const { data: connectors } = useSuspenseQuery(
    AgentService.getKnowledgeConnectorsQuery({ agentId }),
  );
  if (connectors.length === 0) {
    return (
      <EmptyState
        icon={DatabaseIcon}
        title="No connectors configured"
        description="Add a connector to sync knowledge base from external sources"
        className="rounded-lg border"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {connectors.map((connector) => (
        <ConnectorRow key={connector.id} connector={connector} />
      ))}
    </ul>
  );
}
