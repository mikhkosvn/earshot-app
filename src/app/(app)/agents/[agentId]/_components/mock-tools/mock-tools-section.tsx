'use client';

import { PlusIcon, WrenchIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { SectionCard } from '../section-card';
import { MockToolDialog } from './mock-tool-dialog';
import { MockToolList } from './mock-tool-list';
import { MockToolsDefaultSwitch } from './mock-tools-default-switch';

export function MockToolsSection() {
  const [open, setOpen] = useState(false);
  const agentId = useAgentId();
  const prefetch = usePrefetchQuery();

  return (
    <SectionCard
      icon={WrenchIcon}
      title="Mock Tools"
      subtitle="Define mock input/output data for tool calls"
      onOpen={() => prefetch(AgentService.getMockToolsQuery({ agentId }))}
    >
      <MockToolsDefaultSwitch />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
          Add Tool
        </Button>
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <MockToolList />
        </Suspense>
      </QueryErrorBoundary>
      <MockToolDialog tool={null} open={open} onOpenChange={setOpen} />
    </SectionCard>
  );
}
