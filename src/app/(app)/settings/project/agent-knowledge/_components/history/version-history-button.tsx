'use client';

import { HistoryIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useStartVersionsQuery } from '../../_hooks/use-start-versions-query';
import { VersionHistoryList } from './version-history-list';
import { VersionHistorySkeleton } from './version-history-skeleton';

export function VersionHistoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const startVersionsQuery = useStartVersionsQuery();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          startVersionsQuery();
          setIsOpen(true);
        }}
      >
        <HistoryIcon />
        Version history
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full gap-0 sm:max-w-lg">
          <SheetHeader className="border-b">
            <SheetTitle>Version history</SheetTitle>
            <SheetDescription>
              Every save of the instructions, newest first.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <QueryErrorBoundary>
              <Suspense fallback={<VersionHistorySkeleton />}>
                <VersionHistoryList />
              </Suspense>
            </QueryErrorBoundary>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
