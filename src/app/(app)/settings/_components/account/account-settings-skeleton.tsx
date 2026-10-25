import { Skeleton } from '@/components/ui/skeleton';

export function AccountSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-3 md:grid-cols-[2fr_3fr]">
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
