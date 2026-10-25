import { Skeleton } from '@/components/ui/skeleton';

const ROW_KEYS = ['first', 'second', 'third', 'fourth', 'fifth'];

export function ResultsListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Skeleton className="h-7 w-45" />
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-24" />
      </div>
      <div className="flex flex-col gap-1 rounded-lg border bg-background p-2">
        <Skeleton className="h-8 w-full" />
        {ROW_KEYS.map((key) => (
          <Skeleton key={key} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
