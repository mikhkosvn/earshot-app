import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  children: ReactNode;
}

export function StatCard({ label, children }: StatCardProps) {
  return (
    <div className="flex min-h-24 flex-col gap-3 rounded-lg border bg-background p-3">
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div className="truncate text-xl font-semibold">{children}</div>
    </div>
  );
}
