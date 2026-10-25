'use client';

import { cn } from '@/lib/utils';

import { PageButtons } from './page-buttons';
import { DEFAULT_PAGE_PARAM_KEY } from './pagination-config';
import { RowRangeLabel } from './row-range-label';
import { RowsPerPageSelect } from './rows-per-page-select';

interface TablePaginationProps {
  totalCount: number;
  pageParamKey?: string;
  className?: string;
}

export function TablePagination({
  totalCount,
  pageParamKey = DEFAULT_PAGE_PARAM_KEY,
  className,
}: TablePaginationProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4',
        className,
      )}
    >
      <PageButtons totalCount={totalCount} pageParamKey={pageParamKey} />
      <div className="flex items-center gap-4">
        <RowsPerPageSelect pageParamKey={pageParamKey} />
        <RowRangeLabel totalCount={totalCount} pageParamKey={pageParamKey} />
      </div>
    </div>
  );
}
