import { Skeleton } from '@/components/ui/skeleton';

export function EditEvaluatorSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton className="h-[80dvh] flex-1" />
      <Skeleton className="hidden size-72 lg:block" />
    </div>
  );
}
