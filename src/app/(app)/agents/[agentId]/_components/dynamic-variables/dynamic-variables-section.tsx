'use client';

import { BracesIcon, PlusIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { SectionCard } from '../section-card';
import { AddVariablesDialog } from './add-variables/add-variables-dialog';
import { VariableList } from './variable-list';

export function DynamicVariablesSection() {
  const [open, setOpen] = useState(false);
  const agentId = useAgentId();
  const prefetch = usePrefetchQuery();

  return (
    <SectionCard
      icon={BracesIcon}
      title="Dynamic Variables"
      subtitle="Define variables injected at call time for scenario generation"
      onOpen={() =>
        prefetch(AgentService.getDynamicVariablesQuery({ agentId }))
      }
    >
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
          Add Variables
        </Button>
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <VariableList />
        </Suspense>
      </QueryErrorBoundary>
      <AddVariablesDialog open={open} onOpenChange={setOpen} />
    </SectionCard>
  );
}
