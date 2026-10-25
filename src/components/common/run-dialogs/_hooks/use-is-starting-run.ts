'use client';

import { useIsMutating } from '@tanstack/react-query';

import { RunDialogService } from '../_service';

export const useIsStartingRun = () =>
  useIsMutating({ mutationKey: RunDialogService.startRunMutationKey }) > 0;
