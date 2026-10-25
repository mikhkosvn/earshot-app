import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { SortDirection } from '@/server/results/constants/result-list';

interface RunSortIconProps {
  isActive: boolean;
  direction: SortDirection;
}

export function RunSortIcon({ isActive, direction }: RunSortIconProps) {
  if (!isActive) {
    return <ArrowUpDownIcon className="size-3 text-muted-foreground" />;
  }
  if (direction === SortDirection.asc) {
    return <ArrowUpIcon className="size-3" />;
  }
  return <ArrowDownIcon className="size-3" />;
}
