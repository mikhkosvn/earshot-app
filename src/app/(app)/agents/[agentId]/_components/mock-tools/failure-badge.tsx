import { Badge } from '@/components/ui/badge';

import { failureText } from '../../_utils/failure-text';

type FailureBadgeProps = {
  count: number;
};

export function FailureBadge({ count }: FailureBadgeProps) {
  if (count === 0) return null;
  return (
    <Badge className="shrink-0 bg-red-100 text-[10px] text-red-700 uppercase dark:bg-red-950 dark:text-red-300">
      {failureText(count)}
    </Badge>
  );
}
