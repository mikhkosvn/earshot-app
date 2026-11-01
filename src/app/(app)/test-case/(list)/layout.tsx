import { Suspense } from 'react';

import { EvaluatorsSidePanel } from '@/app/(app)/test-case/_components/evaluators-side-panel';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { EvaluatorsToolbarData } from './_components/evaluators-toolbar-data';
import { EvaluatorsToolbarSkeleton } from './_components/evaluators-toolbar-skeleton';
import { FolderSidebarData } from './_components/folder-sidebar-data';
import { FolderSidebarSkeleton } from './_components/folder-sidebar-skeleton';

export default function EvaluatorListLayout({
  children,
}: LayoutProps<'/test-case'>) {
  return (
    <div className="flex h-full min-h-0">
      <Suspense fallback={<FolderSidebarSkeleton />}>
        <FolderSidebarData />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
        <p className="text-xs text-muted-foreground">
          Evaluators are test scenarios that simulate real conversations against
          your agent, each paired with a persona and the metrics it should pass.
        </p>
        <Suspense fallback={<EvaluatorsToolbarSkeleton />}>
          <EvaluatorsToolbarData />
        </Suspense>
        {children}
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={null}>
          <EvaluatorsSidePanel />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
