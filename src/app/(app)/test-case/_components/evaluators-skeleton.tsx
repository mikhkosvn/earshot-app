import { Skeleton } from '@/components/ui/skeleton';

export function EvaluatorsSkeleton() {
  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-48 shrink-0 flex-col gap-2 border-r bg-background p-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
