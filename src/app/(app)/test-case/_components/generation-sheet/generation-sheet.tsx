'use client';

import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SheetTab } from '../../_constants/generation-stage';
import { ActiveChatTab } from './active-chat-tab';
import { GenerationSheetHeader } from './generation-sheet-header';
import { HistoryTab } from './history/history-tab';

const isSheetTab = (value: unknown): value is SheetTab =>
  Object.values(SheetTab).some((item) => item === value);

export function GenerationSheet() {
  const [tab, setTab] = useState<SheetTab>(SheetTab.chat);

  return (
    <aside
      aria-label="Review Generated Scenarios"
      className="relative z-50 flex w-105 shrink-0 flex-col border-l bg-background"
    >
      <GenerationSheetHeader />
      <Tabs
        value={tab}
        onValueChange={(next) => {
          if (isSheetTab(next)) setTab(next);
        }}
        className="flex min-h-0 flex-1 flex-col gap-0"
      >
        <TabsList variant="line" className="w-full justify-start border-b px-3">
          <TabsTrigger value={SheetTab.chat}>Active Chat</TabsTrigger>
          <TabsTrigger value={SheetTab.history}>History</TabsTrigger>
        </TabsList>
        <TabsContent
          value={SheetTab.chat}
          className="flex min-h-0 flex-1 flex-col"
        >
          <QueryErrorBoundary>
            <Suspense fallback={<Skeleton className="m-3 h-40" />}>
              <ActiveChatTab />
            </Suspense>
          </QueryErrorBoundary>
        </TabsContent>
        <TabsContent
          value={SheetTab.history}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <QueryErrorBoundary>
            <Suspense fallback={<Skeleton className="m-3 h-40" />}>
              <HistoryTab onOpenSession={() => setTab(SheetTab.chat)} />
            </Suspense>
          </QueryErrorBoundary>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
