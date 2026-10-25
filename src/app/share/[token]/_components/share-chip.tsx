import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface ShareChipProps {
  icon: LucideIcon;
  children: ReactNode;
}

export function ShareChip({ icon: Icon, children }: ShareChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs">
      <Icon className="size-3.5 text-muted-foreground" />
      {children}
    </span>
  );
}
