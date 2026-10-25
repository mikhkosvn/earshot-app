import { Skeleton } from '@/components/ui/skeleton';

export function EditFormSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-150 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
