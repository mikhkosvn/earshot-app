import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { SortDirection } from '@/server/evaluators/constants/evaluator-list';

type SortIconProps = {
  isActive: boolean;
  direction: SortDirection;
};

export function SortIcon({ isActive, direction }: SortIconProps) {
  if (!isActive) {
    return <ArrowUpDownIcon className="size-3 text-muted-foreground" />;
  }
  if (direction === SortDirection.asc)
    return <ArrowUpIcon className="size-3" />;
  return <ArrowDownIcon className="size-3" />;
}
