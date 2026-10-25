'use client';

import { format, formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';

interface RelativeTimeProps {
  date: Date | string;
  className?: string;
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  const value = new Date(date);

  return (
    <time
      dateTime={value.toISOString()}
      suppressHydrationWarning
      aria-label={format(value, 'PPpp')}
      className={cn('text-[11px] text-muted-foreground', className)}
    >
      {formatDistanceToNow(value, { addSuffix: true })}
    </time>
  );
}
