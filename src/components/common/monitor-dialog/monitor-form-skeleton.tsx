import { Skeleton } from '@/components/ui/skeleton';

export function MonitorFormSkeleton() {
  return (
    <div className="grid gap-3 bg-muted/40 p-3 md:grid-cols-[minmax(0,1fr)_240px]">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <Skeleton className="h-52 w-full" />
    </div>
  );
}
