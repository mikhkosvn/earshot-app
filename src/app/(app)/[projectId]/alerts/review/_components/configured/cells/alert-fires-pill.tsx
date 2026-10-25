'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { useAlertFireCount } from '../../../_hooks/queries/use-alert-fire-count';
import { firesText } from '../../../_utils/fires-text';

const QUIET_CLASS =
  'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300';
const FIRED_CLASS =
  'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300';

const pillClassOf = (count: number) => {
  if (count === 0) return QUIET_CLASS;
  return FIRED_CLASS;
};

type AlertFiresPillProps = {
  alertId: number;
};

export function AlertFiresPill({ alertId }: AlertFiresPillProps) {
  const count = useAlertFireCount(alertId);

  return (
    <Badge variant="outline" className={cn('text-[11px]', pillClassOf(count))}>
      {firesText(count)}
    </Badge>
  );
}
