'use client';

import { useWatch } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';

export function AutoNameBadge() {
  const { control } = useMonitorFormContext();
  const autoName = useWatch({ control, name: 'autoName' });
  if (!autoName) return null;

  return (
    <Badge
      variant="outline"
      className="h-4 rounded-sm px-1 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
    >
      Auto
    </Badge>
  );
}
