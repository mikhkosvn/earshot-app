'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AgentService } from '../../../_service';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { useAgent } from '../../_hooks/use-agent';
import { AgentSwitcherItems } from './agent-switcher-items';

export function AgentSwitcher() {
  const agent = useAgent();
  const prefetch = usePrefetchQuery();

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) return;
        prefetch(AgentService.getOptionsQuery({ projectId: agent.projectId }));
      }}
    >
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="xs"
            className="max-w-56 font-normal text-foreground"
          />
        }
      >
        <span className="truncate">{agent.name}</span>
        <ChevronsUpDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 min-w-56">
        <QueryErrorBoundary>
          <Suspense
            fallback={
              <p className="p-2 text-xs text-muted-foreground">Loading...</p>
            }
          >
            <AgentSwitcherItems
              projectId={agent.projectId}
              currentAgentId={agent.id}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
