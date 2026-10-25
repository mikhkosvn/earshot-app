'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';

import { useEvaluatorListQuery } from '../../_hooks/use-evaluator-list-query';

export function EvaluatorsPagination() {
  const { data: count } = useSuspenseQuery({
    ...useEvaluatorListQuery(),
    select: (page) => page.count,
  });

  return <TablePagination totalCount={count} />;
}
