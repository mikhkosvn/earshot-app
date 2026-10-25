import { PLOT_COLOR_VALUE } from '@/server/dashboards/constants/plot/plot-color';
import type { PlotConfig, SlicePlotData } from '@/server/dashboards/types';

interface SliceListProps {
  data: SlicePlotData;
  config: PlotConfig;
}

export function SliceList({ data, config }: SliceListProps) {
  const color = PLOT_COLOR_VALUE[config.color];
  const top = data.slices[0]?.value ?? 1;

  return (
    <ul className="flex size-full flex-col gap-2 overflow-y-auto pr-1 text-xs">
      {data.slices.map((slice) => (
        <li key={slice.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">{slice.label}</span>
            <span className="shrink-0 font-medium tabular-nums">
              {slice.value}
              <span className="ml-1 text-muted-foreground">
                {slice.percentage}%
              </span>
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(slice.value / top) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
