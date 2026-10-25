'use client';

import { getRowRange } from './pagination-config';
import { usePaginationParams } from './use-pagination-params';

type RowRangeLabelProps = {
  totalCount: number;
  pageParamKey: string;
};

export function RowRangeLabel({
  totalCount,
  pageParamKey,
}: RowRangeLabelProps) {
  const { page, pageSize } = usePaginationParams(pageParamKey);
  const { from, to } = getRowRange(page, pageSize, totalCount);

  return (
    <p className="text-xs">
      {from}-{to} of {totalCount} rows
    </p>
  );
}
