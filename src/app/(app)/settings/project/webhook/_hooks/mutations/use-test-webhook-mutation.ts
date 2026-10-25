'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { testProjectWebhookAction } from '@/server/project-webhooks/actions';
import type { TestProjectWebhookInput } from '@/server/project-webhooks/types';

import { WebhookService } from '../../_service';

export const useTestWebhookMutation = () =>
  useMutation({
    mutationKey: WebhookService.testWebhookMutationKey,
    mutationFn: (input: TestProjectWebhookInput) =>
      testProjectWebhookAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(
        `The test webhook was delivered. The endpoint answered with status ${result.data.status} in ${result.data.durationMs} ms.`,
      );
    },
  });
