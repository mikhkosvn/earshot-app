import 'server-only';

import type { WebhookPayload } from '@/server/project-webhooks/types';

export const hasConversationContent = (payload: WebhookPayload) => {
  const turns = payload.transcript_object;
  if (Array.isArray(turns) && turns.length > 0) return true;
  return typeof payload.transcript === 'string' && payload.transcript !== '';
};
