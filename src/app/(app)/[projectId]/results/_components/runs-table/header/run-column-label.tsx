'use client';

import type { RunSortField } from '@/server/results/constants/result-list';

import { SortableRunHead } from './sortable-run-head';

type RunColumnLabelProps = {
  label: string;
  sortField: RunSortField | null;
  pageParamKey: string;
};

export function RunColumnLabel({
  label,
  sortField,
  pageParamKey,
}: RunColumnLabelProps) {
  if (sortField === null) return label;
  return (
    <SortableRunHead
      field={sortField}
      label={label}
      pageParamKey={pageParamKey}
    />
  );
}
