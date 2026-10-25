import type { BucketPlotData, PlotConfig } from '@/server/dashboards/types';

import { seriesChartConfig } from '../../_utils/chart-format';

type SeriesLegendProps = {
  data: BucketPlotData;
  config: PlotConfig;
};

export function SeriesLegend({ data, config }: SeriesLegendProps) {
  if (data.series.length < 2) return null;
  const chartConfig = seriesChartConfig(data.series, config.color);

  return (
    <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
      {data.series.map((series) => (
        <li key={series.key} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="size-2.5 rounded-xs"
            style={{ backgroundColor: chartConfig[series.key]?.color }}
          />
          <span className="max-w-32 truncate">{series.label}</span>
        </li>
      ))}
    </ul>
  );
}
