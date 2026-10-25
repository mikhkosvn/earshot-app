'use client';

import { useIsMutating } from '@tanstack/react-query';

import { TelephonyService } from '../_service';

export const useIsImportingPhoneNumber = () =>
  useIsMutating({
    mutationKey: TelephonyService.createPhoneNumberMutationKey,
  }) > 0;
