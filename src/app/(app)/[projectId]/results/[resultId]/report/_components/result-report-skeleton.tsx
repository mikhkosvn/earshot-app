import { Skeleton } from '@/components/ui/skeleton';

export function ResultReportSkeleton() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
