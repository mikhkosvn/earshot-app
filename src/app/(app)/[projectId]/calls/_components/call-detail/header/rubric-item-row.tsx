import { RubricItemIcon } from './rubric-item-icon';

import type { RubricBreakdownItem } from '@/server/metric-scoring/types';

type RubricItemRowProps = {
  item: RubricBreakdownItem;
};

export function RubricItemRow({ item }: RubricItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-xs">
      <span className="font-medium">{item.metricName}</span>
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {item.conditions}
        <RubricItemIcon passed={item.passed} />
      </span>
    </div>
  );
}
