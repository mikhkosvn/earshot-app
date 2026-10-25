import type { ReactNode } from 'react';

interface MetricGroupProps {
  label: string;
  children: ReactNode;
}

export function MetricGroup({ label, children }: MetricGroupProps) {
  return (
    <div className="flex flex-col gap-2" role="group" aria-label={label}>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </div>
  );
}
