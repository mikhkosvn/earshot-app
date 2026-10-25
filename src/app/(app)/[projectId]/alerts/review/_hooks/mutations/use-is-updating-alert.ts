'use client';

import { useIsMutating } from '@tanstack/react-query';

import { AlertService } from '../../_service';

const alertIdOf = (variables: unknown) => {
  if (typeof variables !== 'object' || variables === null) return null;
  if (!('alertId' in variables)) return null;
  return variables.alertId;
};

export const useIsUpdatingAlert = (alertId: number) =>
  useIsMutating({
    mutationKey: AlertService.updateMutationKey,
    predicate: (mutation) => alertIdOf(mutation.state.variables) === alertId,
  }) > 0;
