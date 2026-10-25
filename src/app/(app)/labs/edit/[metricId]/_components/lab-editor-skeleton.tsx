import { Skeleton } from '@/components/ui/skeleton';

export function LabEditorSkeleton() {
  return (
    <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
