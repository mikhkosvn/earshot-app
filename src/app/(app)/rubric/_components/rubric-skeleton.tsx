import { Skeleton } from '@/components/ui/skeleton';

export function RubricSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
