import type { PredefinedMetricBadge } from '@/generated/prisma/enums';
import { PredefinedMetricBadgeLabel } from '@/server/metrics/constants/predefined-metric-badge-labels';

interface PredefinedBadgeProps {
  badge: PredefinedMetricBadge | null;
}

export function PredefinedBadge({ badge }: PredefinedBadgeProps) {
  if (!badge) return null;

  return (
    <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground">
      {PredefinedMetricBadgeLabel[badge]}
    </span>
  );
}
