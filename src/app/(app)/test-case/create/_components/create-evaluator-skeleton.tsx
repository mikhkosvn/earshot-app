import { Skeleton } from '@/components/ui/skeleton';

export function CreateEvaluatorSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="mx-auto h-96 w-full max-w-4xl" />
    </div>
  );
}
