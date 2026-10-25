import { Skeleton } from '@/components/ui/skeleton';

export function ResultDetailSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
