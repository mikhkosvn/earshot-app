import { Skeleton } from '@/components/ui/skeleton';

export function TelephonySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
