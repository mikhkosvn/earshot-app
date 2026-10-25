import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function HeaderChip({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex h-7 items-center gap-1.5 rounded-md border bg-background px-2 text-xs [&_svg:not([class*=size-])]:size-3.5',
        className,
      )}
      {...props}
    />
  );
}
