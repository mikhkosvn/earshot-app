import { Skeleton } from '@/components/ui/skeleton';

export function OrganizationGeneralSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
