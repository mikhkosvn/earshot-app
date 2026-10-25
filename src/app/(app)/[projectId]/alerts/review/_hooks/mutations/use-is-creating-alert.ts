'use client';

import { useIsMutating } from '@tanstack/react-query';

import { AlertService } from '../../_service';

export const useIsCreatingAlert = () =>
  useIsMutating({ mutationKey: AlertService.createMutationKey }) > 0;
