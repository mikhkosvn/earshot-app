'use client';

import { useIsMutating } from '@tanstack/react-query';

import { WebhookService } from '../_service';

export const useIsSavingWebhook = () =>
  useIsMutating({ mutationKey: WebhookService.saveWebhookMutationKey }) > 0;
