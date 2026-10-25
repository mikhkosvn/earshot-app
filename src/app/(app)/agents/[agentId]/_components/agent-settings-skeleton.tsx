import { Skeleton } from '@/components/ui/skeleton';

export function AgentSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-3 lg:grid-cols-2">
        <Skeleton className="h-150 w-full" />
        <Skeleton className="h-150 w-full" />
      </div>
    </div>
  );
}
