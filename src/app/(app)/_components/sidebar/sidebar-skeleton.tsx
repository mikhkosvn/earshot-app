import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_ROWS = Array.from({ length: 13 }, (_, index) => index);

export function SidebarSkeleton() {
  return (
    <div className="flex w-52 shrink-0 flex-col gap-2 border-r bg-background px-3 py-3.5">
      {SKELETON_ROWS.map((row) => (
        <Skeleton key={row} className="h-6 w-full" />
      ))}
    </div>
  );
}
