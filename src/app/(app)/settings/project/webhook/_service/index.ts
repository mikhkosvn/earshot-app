import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { getProjectWebhookAction } from '@/server/project-webhooks/actions';

export const WebhookKey = {
  settings: 'project-webhook',
  save: 'save-project-webhook',
  test: 'test-project-webhook',
} as const;

export type WebhookKey = (typeof WebhookKey)[keyof typeof WebhookKey];

export class WebhookService {
  static readonly saveWebhookMutationKey = [WebhookKey.save];
  static readonly testWebhookMutationKey = [WebhookKey.test];

  static getWebhookQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [WebhookKey.settings, args],
      queryFn: () => deferAction(() => getProjectWebhookAction(args)),
    });
  }
}
