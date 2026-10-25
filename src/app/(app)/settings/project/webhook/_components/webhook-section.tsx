'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { WebhookForm } from './webhook-form';

export function WebhookSection() {
  const projectId = useCurrentProjectId();

  return <WebhookForm key={projectId} />;
}
