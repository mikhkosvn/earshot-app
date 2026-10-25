import { Skeleton } from '@/components/ui/skeleton';

export function ProviderKeysSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-150 w-full" />
    </div>
  );
}
