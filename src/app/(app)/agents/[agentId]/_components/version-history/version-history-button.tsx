'use client';

import { HistoryIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import { AgentService } from '../../../_service';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { useAgentId } from '../../_hooks/use-agent-id';
import { VersionList } from './version-list';

export function VersionHistoryButton() {
  const [open, setOpen] = useState(false);
  const agentId = useAgentId();
  const prefetch = usePrefetchQuery();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          prefetch(AgentService.getVersionsQuery({ agentId }));
          setOpen(true);
        }}
      >
        <HistoryIcon />
        Version History
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
          <SheetHeader className="border-b">
            <SheetTitle>Version History</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto p-3">
            <QueryErrorBoundary>
              <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                <VersionList />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
