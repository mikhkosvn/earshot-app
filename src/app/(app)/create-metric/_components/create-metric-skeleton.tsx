import { Skeleton } from '@/components/ui/skeleton';

export function CreateMetricSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-6 w-48" />
      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton className="h-150 w-full" />
      </div>
    </div>
  );
}
