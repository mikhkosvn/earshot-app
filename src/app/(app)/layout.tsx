import { Suspense, type ReactNode } from 'react';

import { BackgroundTaskPanels } from '@/components/common/background-tasks/background-task-panels';

import { AppSidebarData } from './_components/sidebar/app-sidebar-data';
import { SidebarSkeleton } from './_components/sidebar/sidebar-skeleton';
import { TopBarData } from './_components/top-bar/top-bar-data';
import { TopBarSkeleton } from './_components/top-bar/top-bar-skeleton';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <Suspense fallback={<TopBarSkeleton />}>
        <TopBarData />
      </Suspense>
      <div className="flex min-h-0 flex-1">
        <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebarData />
        </Suspense>
        <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
      <BackgroundTaskPanels />
    </div>
  );
}
