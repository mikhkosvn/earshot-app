'use client';

import { useIsMutating } from '@tanstack/react-query';

import { RunDialogService } from '../_service';

export const useIsRunningSpec = () =>
  useIsMutating({ mutationKey: RunDialogService.runTestSuiteMutationKey }) > 0;
