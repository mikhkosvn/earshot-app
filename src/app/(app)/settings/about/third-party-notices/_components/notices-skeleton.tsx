import { Skeleton } from '@/components/ui/skeleton';

export function NoticesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
    </div>
  );
}
