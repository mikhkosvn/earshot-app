'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ProviderKeysService } from '../_service';

export const useIsSavingProviderApiKeys = () =>
  useIsMutating({ mutationKey: ProviderKeysService.saveKeysMutationKey }) > 0;
