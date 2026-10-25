import { Badge } from '@/components/ui/badge';
import { MonitorRunStatus } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { MonitorRunStatusLabel } from '@/server/monitors/constants/monitor-run-status-labels';

const STATUS_CLASS: Record<MonitorRunStatus, string> = {
  [MonitorRunStatus.queued]: 'text-muted-foreground',
  [MonitorRunStatus.running]: 'border-blue-500/30 text-blue-600',
  [MonitorRunStatus.completed]: 'border-emerald-500/30 text-emerald-600',
  [MonitorRunStatus.failed]: 'border-destructive/30 text-destructive',
  [MonitorRunStatus.skipped]: 'text-muted-foreground',
};

type MonitorRunStatusBadgeProps = {
  status: MonitorRunStatus;
};

export function MonitorRunStatusBadge({ status }: MonitorRunStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', STATUS_CLASS[status])}
    >
      {MonitorRunStatusLabel[status]}
    </Badge>
  );
}
