'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import type { WebhookNotification } from '@/generated/prisma/enums';
import { WebhookNotificationLabel } from '@/server/project-webhooks/constants/webhook-notification-labels';

import { useTestWebhookMutation } from '../../_hooks/mutations/use-test-webhook-mutation';
import { useWebhookSettings } from '../../_hooks/use-webhook-settings';
import { WebhookTestIcon } from './webhook-test-icon';

interface WebhookTestButtonProps {
  notification: WebhookNotification;
}

export function WebhookTestButton({ notification }: WebhookTestButtonProps) {
  const projectId = useCurrentProjectId();
  const { url } = useWebhookSettings();
  const testWebhook = useTestWebhookMutation();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={!url || testWebhook.isPending}
      aria-label={`Test ${WebhookNotificationLabel[notification]}`}
      onClick={() => testWebhook.mutate({ projectId, notification })}
    >
      <WebhookTestIcon isPending={testWebhook.isPending} />
      Test
    </Button>
  );
}
