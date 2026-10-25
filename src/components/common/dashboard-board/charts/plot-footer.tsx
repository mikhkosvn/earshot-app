import { PlotDataKind } from '@/server/dashboards/constants/plot/plot-data-kind';
import type { PlotData } from '@/server/dashboards/types';

interface PlotFooterProps {
  data: PlotData;
}

export function PlotFooter({ data }: PlotFooterProps) {
  if (data.kind === PlotDataKind.stat) return null;

  return (
    <div className="flex items-center justify-between gap-2 border-t px-3 py-2 text-xs text-muted-foreground">
      <span className="truncate">{data.displayName}</span>
      <span className="shrink-0">{data.aggregationLabel}</span>
    </div>
  );
}
