'use client';

import { useIsMutating } from '@tanstack/react-query';

import { InsightService } from '../../_service';

const metricIdOf = (variables: unknown) => {
  if (typeof variables !== 'object' || variables === null) return null;
  if (!('metricId' in variables)) return null;
  return variables.metricId;
};

export const useIsRunningInsight = (metricId: number) =>
  useIsMutating({
    mutationKey: InsightService.runMutationKey,
    predicate: (mutation) => metricIdOf(mutation.state.variables) === metricId,
  }) > 0;
