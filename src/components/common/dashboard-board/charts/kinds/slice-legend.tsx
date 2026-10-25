import type {
  PlotConfig,
  PlotSlice,
  SlicePlotData,
} from '@/server/dashboards/types';

import { sliceColor } from '../../_utils/chart-format';

type SliceLegendProps = {
  data: SlicePlotData;
  config: PlotConfig;
};

const MAX_LEGEND_ITEMS = 6;

const valueText = (slice: PlotSlice, showPercentages: boolean) => {
  if (showPercentages) return `${slice.value} (${slice.percentage}%)`;
  return String(slice.value);
};

export function SliceLegend({ data, config }: SliceLegendProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
      {data.slices.slice(0, MAX_LEGEND_ITEMS).map((slice, index) => (
        <li key={slice.label} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="size-2.5 rounded-xs"
            style={{ backgroundColor: sliceColor(index, config.color) }}
          />
          <span className="max-w-32 truncate">{slice.label}</span>
          <span className="font-medium">
            {valueText(slice, config.showPercentages)}
          </span>
        </li>
      ))}
    </ul>
  );
}
