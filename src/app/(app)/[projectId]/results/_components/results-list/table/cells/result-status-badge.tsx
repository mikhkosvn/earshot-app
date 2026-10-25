import { Badge } from '@/components/ui/badge';
import type { RunStatus } from '@/generated/prisma/enums';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';

type ResultStatusBadgeProps = {
  status: RunStatus;
};

export function ResultStatusBadge({ status }: ResultStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      data-status={status}
      className="data-[status=completed]:border-blue-300 data-[status=completed]:bg-blue-50 data-[status=completed]:text-blue-700 data-[status=failed]:border-destructive/40 data-[status=failed]:text-destructive dark:data-[status=completed]:bg-blue-950 dark:data-[status=completed]:text-blue-300"
    >
      {RunStatusLabel[status]}
    </Badge>
  );
}
