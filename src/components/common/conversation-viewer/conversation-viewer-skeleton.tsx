import { Skeleton } from '@/components/ui/skeleton';

export function ConversationViewerSkeleton() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
