'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import type { PlotConfig } from '@/server/dashboards/types';

import type { DashboardBoardState } from '../_utils/board-types';
import { PlotSkeleton } from './plot-skeleton';

const PlotBodyContent = dynamic(
  () => import('./plot-body-content').then((module) => module.PlotBodyContent),
  { ssr: false, loading: () => <PlotSkeleton /> },
);

type PlotBodyProps = {
  board: DashboardBoardState;
  config: PlotConfig;
};

export function PlotBody({ board, config }: PlotBodyProps) {
  return (
    <QueryErrorBoundary>
      <Suspense fallback={<PlotSkeleton />}>
        <PlotBodyContent board={board} config={config} />
      </Suspense>
    </QueryErrorBoundary>
  );
}
