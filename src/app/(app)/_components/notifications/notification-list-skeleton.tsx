import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_ROWS = [0, 1, 2];

export function NotificationListSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {SKELETON_ROWS.map((row) => (
        <Skeleton key={row} className="h-12 w-full" />
      ))}
    </div>
  );
}
