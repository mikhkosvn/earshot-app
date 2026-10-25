'use client';

import { useIsMutating } from '@tanstack/react-query';

import { TelephonyService } from '../_service';

export const useIsUpdatingPhoneNumber = () =>
  useIsMutating({
    mutationKey: TelephonyService.updatePhoneNumberMutationKey,
  }) > 0;
