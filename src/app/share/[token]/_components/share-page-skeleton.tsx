import { Skeleton } from '@/components/ui/skeleton';

export function SharePageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 p-4">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
