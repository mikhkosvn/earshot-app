import { Skeleton } from '@/components/ui/skeleton';

export function EvaluatorTableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="ml-auto h-7 w-64" />
    </div>
  );
}
