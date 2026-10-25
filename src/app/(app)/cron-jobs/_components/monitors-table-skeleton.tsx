import { Skeleton } from '@/components/ui/skeleton';

export function MonitorsTableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-7 w-full" />
    </div>
  );
}
