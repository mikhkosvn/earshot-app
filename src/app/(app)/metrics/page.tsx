import { Suspense } from 'react';

import { PageHeader } from '@/components/common/page-header/page-header';

import { MetricsData } from './_components/metrics-data';
import { MetricsSkeleton } from './_components/metrics-skeleton';

export default function MetricsPage({ searchParams }: PageProps<'/metrics'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <PageHeader
        title="Metrics"
        description={
          'Define what to measure on every call from predefined checks to custom LLM-judge and Python metrics then reuse them across simulations and observability.'
        }
      />
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
