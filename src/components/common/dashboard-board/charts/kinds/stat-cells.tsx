import type { StatPlotData } from '@/server/dashboards/types';

import { changeText } from '../../_utils/chart-format';
import { StatUnit } from './stat-unit';

type StatCellsProps = {
  data: StatPlotData;
};

export function StatCells({ data }: StatCellsProps) {
  return (
    <dl className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
      {data.cells.map((cell) => (
        <div key={cell.label} className="flex flex-col gap-1 px-5 py-3">
          <dt className="text-sm font-medium">{cell.label}</dt>
          <dd className="flex items-baseline gap-1 text-3xl font-semibold tabular-nums">
            {cell.value}
            <StatUnit unit={cell.unit} />
          </dd>
          <dd className="text-xs text-muted-foreground">
            {changeText(cell.change)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
