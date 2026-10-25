import { RelativeTime } from '@/components/common/relative-time';
import { Badge } from '@/components/ui/badge';
import { InsightStatusLabel } from '@/server/insights/constants/insight-status-labels';
import type { LatestInsightView } from '@/server/insights/types';

interface LatestInsightLineProps {
  insight: LatestInsightView | null;
}

const detailOf = (insight: LatestInsightView) => {
  if (insight.errorMessage) return insight.errorMessage;
  return insight.headline;
};

export function LatestInsightLine({ insight }: LatestInsightLineProps) {
  if (!insight) return null;
  return (
    <div className="flex flex-col gap-1 border-b px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          Last run
          <Badge variant="outline" className="text-[10px]">
            {InsightStatusLabel[insight.status]}
          </Badge>
        </span>
        <RelativeTime date={insight.createdAt} />
      </div>
      <p className="text-[11px] leading-snug">{detailOf(insight)}</p>
      <p className="text-[10px] text-muted-foreground">
        {insight.numCallsAnalyzed} calls analysed ·{' '}
        {insight.totalFailuresInWindow} failures in the window
      </p>
    </div>
  );
}
