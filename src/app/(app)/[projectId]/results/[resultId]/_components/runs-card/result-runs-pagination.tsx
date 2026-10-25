'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';

import { useResultRunsQuery } from '../../../_hooks/runs/use-result-runs-query';

type ResultRunsPaginationProps = {
  pageParamKey: string;
};

export function ResultRunsPagination({
  pageParamKey,
}: ResultRunsPaginationProps) {
  const { data } = useResultRunsQuery();

  return (
    <TablePagination totalCount={data.count} pageParamKey={pageParamKey} />
  );
}
