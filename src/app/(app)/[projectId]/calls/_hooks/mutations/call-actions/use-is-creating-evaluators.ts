'use client';

import { useIsMutating } from '@tanstack/react-query';

import { CallService } from '../../../_service';

export const useIsCreatingEvaluators = () =>
  useIsMutating({ mutationKey: CallService.useAsEvaluatorMutationKey }) > 0;
