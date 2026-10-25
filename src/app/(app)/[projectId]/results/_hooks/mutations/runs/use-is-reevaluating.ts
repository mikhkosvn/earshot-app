'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ResultService } from '../../../_service';

export const useIsReevaluating = () =>
  useIsMutating({ mutationKey: ResultService.reevaluateMutationKey }) > 0;
