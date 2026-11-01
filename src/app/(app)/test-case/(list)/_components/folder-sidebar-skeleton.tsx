import { Skeleton } from '@/components/ui/skeleton';

export function FolderSidebarSkeleton() {
  return (
    <div className="flex w-48 shrink-0 flex-col gap-2 border-r bg-background p-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}
