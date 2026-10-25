'use client';

import type { LabRowView } from '@/server/labs/types';

import { useLab } from '../../../../_hooks/lab/use-lab';
import { valueText } from '../../../../_utils/value-text';
import { ChangedBadge } from './changed-badge';
import { ValueIcon } from './value-icon';

type ActualValueCellProps = {
  row: LabRowView;
};

export function ActualValueCell({ row }: ActualValueCellProps) {
  const { run } = useLab();
  const isChanged = run?.changedReviewIds.includes(row.reviewId) ?? false;

  return (
    <div className="flex w-28 flex-col items-center gap-1.5 text-sm text-muted-foreground">
      <span className="flex items-center gap-1">
        <ValueIcon value={row.actual} />
        {valueText(row.actual)}
      </span>
      <ChangedBadge isChanged={isChanged} />
    </div>
  );
}
