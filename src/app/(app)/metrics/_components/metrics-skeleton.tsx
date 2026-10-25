import { Skeleton } from '@/components/ui/skeleton';

import { METRIC_GRID_CLASS } from '../_constants/metric-grid';

const SKELETON_ROWS = Array.from({ length: 8 }, (_, index) => index);

export function MetricsSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true">
      <Skeleton className="h-8 w-full max-w-4xl" />
      <div className="overflow-hidden rounded-lg border">
        <div className="h-10 bg-muted/50" />
        <div className="flex flex-col divide-y">
          {SKELETON_ROWS.map((row) => (
            <div key={row} className={`${METRIC_GRID_CLASS} h-9`}>
              <Skeleton className="size-4" />
              <Skeleton className="size-4" />
              <Skeleton className="size-4" />
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
