import type { GraphLine } from '../../_utils/metric-graph';

type ChartLegendProps = {
  lines: GraphLine[];
};

export function ChartLegend({ lines }: ChartLegendProps) {
  if (lines.length === 0) return null;

  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
      {lines.map((line) => (
        <li
          key={line.key}
          className="flex items-center gap-1.5"
          style={{ color: line.color }}
        >
          <span
            className="h-0.5 w-3 rounded-full"
            style={{ backgroundColor: line.color }}
          />
          {line.label}
        </li>
      ))}
    </ul>
  );
}
