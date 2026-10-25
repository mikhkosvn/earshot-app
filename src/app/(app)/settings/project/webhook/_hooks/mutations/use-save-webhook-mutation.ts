'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveProjectWebhookAction } from '@/server/project-webhooks/actions';
import type { SaveProjectWebhookInput } from '@/server/project-webhooks/types';

import { WebhookService } from '../../_service';

export const useSaveWebhookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: WebhookService.saveWebhookMutationKey,
    mutationFn: (input: SaveProjectWebhookInput) =>
      saveProjectWebhookAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The webhook settings are saved.');
      return queryClient.invalidateQueries({
        queryKey: WebhookService.getWebhookQuery({ projectId: input.projectId })
          .queryKey,
      });
    },
  });
};
