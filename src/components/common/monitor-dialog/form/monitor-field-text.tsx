import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type MonitorFieldTextProps = {
  children?: ReactNode;
  className?: string;
};

export function MonitorFieldText({
  children,
  className,
}: MonitorFieldTextProps) {
  if (!children) return null;

  return (
    <p className={cn('text-xs text-muted-foreground', className)}>{children}</p>
  );
}
