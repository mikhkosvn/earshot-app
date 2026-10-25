import { Skeleton } from '@/components/ui/skeleton';

export function MetricReviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
