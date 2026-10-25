'use client';

import { BookOpenIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { SectionCard } from '../section-card';
import { ConnectorsBlock } from './connectors/connectors-block';
import { KnowledgeDropZone } from './files/knowledge-drop-zone';
import { KnowledgeFileList } from './files/knowledge-file-list';

export function KnowledgeSection() {
  const agentId = useAgentId();
  const prefetch = usePrefetchQuery();

  return (
    <SectionCard
      icon={BookOpenIcon}
      title="Agent's Knowledge"
      subtitle="Upload and manage knowledge base files"
      onOpen={() => {
        prefetch(AgentService.getKnowledgeFilesQuery({ agentId }));
        prefetch(AgentService.getKnowledgeConnectorsQuery({ agentId }));
      }}
    >
      <p className="text-xs text-muted-foreground">
        Give the Test Agent context by uploading documents or connecting
        external sources like BigQuery or websites, so simulated conversations
        are grounded in your data.
      </p>
      <KnowledgeDropZone />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <KnowledgeFileList />
        </Suspense>
      </QueryErrorBoundary>
      <ConnectorsBlock />
    </SectionCard>
  );
}
