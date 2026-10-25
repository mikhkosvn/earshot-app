import { cn } from '@/lib/utils';

import { barToneClass } from '../_utils/bar-tone';

type PercentBarProps = {
  percent: number;
  className?: string;
};

export function PercentBar({ percent, className }: PercentBarProps) {
  const width = Math.min(Math.max(percent, 0), 100);

  return (
    <div
      className={cn(
        'h-1.5 w-24 overflow-hidden rounded-full bg-muted',
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full', barToneClass(percent))}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
