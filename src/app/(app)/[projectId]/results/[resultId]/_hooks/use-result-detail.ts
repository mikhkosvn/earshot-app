'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useResultId } from '../../_hooks/use-result-id';
import { ResultService } from '../../_service';

export const useResultDetail = () => {
  const resultId = useResultId();
  const { data } = useSuspenseQuery(ResultService.getDetailQuery({ resultId }));
  return data;
};
