import { Skeleton } from '@/components/ui/skeleton';

export function PersonalityGridSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-11 w-full" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
