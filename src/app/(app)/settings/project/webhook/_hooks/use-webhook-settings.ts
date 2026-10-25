'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { WebhookService } from '../_service';

export const useWebhookSettings = () => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(
    WebhookService.getWebhookQuery({ projectId }),
  );
  return data;
};
