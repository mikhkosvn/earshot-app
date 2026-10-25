import { Skeleton } from '@/components/ui/skeleton';

const PLOT_SLOTS = ['a', 'b', 'c', 'd'];

export function DashboardBoardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-7 w-96" />
      </div>
      <Skeleton className="h-28 w-full" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {PLOT_SLOTS.map((slot) => (
          <Skeleton key={slot} className="h-96" />
        ))}
      </div>
    </div>
  );
}
