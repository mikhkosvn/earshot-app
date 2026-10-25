import type { ReactNode } from 'react';

interface SharedMetricGroupLabelProps {
  children: ReactNode;
}

export function SharedMetricGroupLabel({
  children,
}: SharedMetricGroupLabelProps) {
  return (
    <h3 className="border-b pb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </h3>
  );
}
