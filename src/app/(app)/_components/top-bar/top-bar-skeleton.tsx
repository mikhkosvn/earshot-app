import { Skeleton } from '@/components/ui/skeleton';

export function TopBarSkeleton() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b bg-background px-4">
      <Skeleton className="h-5 w-72" />
      <Skeleton className="h-7 w-64" />
    </header>
  );
}
