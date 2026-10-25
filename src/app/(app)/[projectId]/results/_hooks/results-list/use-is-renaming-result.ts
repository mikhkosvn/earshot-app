'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ResultService } from '../../_service';

export const useIsRenamingResult = () =>
  useIsMutating({ mutationKey: ResultService.renameResultMutationKey }) > 0;
