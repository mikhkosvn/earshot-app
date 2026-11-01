'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';

import { useEvaluatorListQuery } from '../../_hooks/use-evaluator-list-query';

export function EvaluatorsPagination() {
  const { data } = useSuspenseQuery(useEvaluatorListQuery());

  return <TablePagination totalCount={data.count} />;
}
