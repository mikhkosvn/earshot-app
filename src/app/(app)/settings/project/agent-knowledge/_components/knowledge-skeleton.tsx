import { Skeleton } from '@/components/ui/skeleton';

export function KnowledgeSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-120 w-full" />
    </div>
  );
}
