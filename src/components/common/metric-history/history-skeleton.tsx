import { Skeleton } from '@/components/ui/skeleton';

export function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
