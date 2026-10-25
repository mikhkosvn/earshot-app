'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveProviderApiKeysAction } from '@/server/provider-api-keys/actions';
import type { SaveProviderApiKeysInput } from '@/server/provider-api-keys/types';

import { ProviderKeysService } from '../../_service';

export const useSaveProviderApiKeysMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ProviderKeysService.saveKeysMutationKey,
    mutationFn: (input: SaveProviderApiKeysInput) =>
      saveProviderApiKeysAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The provider API keys are saved.');
      return queryClient.invalidateQueries({
        queryKey: ProviderKeysService.getKeysQuery({
          projectId: input.projectId,
        }).queryKey,
      });
    },
  });
};
