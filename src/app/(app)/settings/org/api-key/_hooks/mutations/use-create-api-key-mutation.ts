'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createApiKeyAction } from '@/server/api-keys/actions';
import type { CreateApiKeyInput } from '@/server/api-keys/types/api-key-row';

import { ApiKeyService } from '../../_service';

export const useCreateApiKeyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ApiKeyService.createApiKeyMutationKey,
    mutationFn: (input: CreateApiKeyInput) => createApiKeyAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: ApiKeyService.getApiKeysQuery({
          organizationId: input.organizationId,
        }).queryKey,
      });
    },
  });
};
