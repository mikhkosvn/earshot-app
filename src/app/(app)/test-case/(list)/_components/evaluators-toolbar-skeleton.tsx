import { Skeleton } from '@/components/ui/skeleton';

export function EvaluatorsToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-1/2" />
    </div>
  );
}
