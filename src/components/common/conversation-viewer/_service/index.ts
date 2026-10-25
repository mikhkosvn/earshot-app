import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { getConversationAction } from '@/server/conversations/actions';
import { getSharedConversationAction } from '@/server/share-links/actions';

export const ConversationKey = {
  detail: 'conversation-detail',
  correctMetric: 'correct-conversation-metric',
} as const;

export type ConversationKey =
  (typeof ConversationKey)[keyof typeof ConversationKey];

export interface ConversationQueryArgs {
  conversationId: number;
  shareToken?: string | null;
}

const loadConversation = ({
  conversationId,
  shareToken,
}: ConversationQueryArgs) => {
  if (shareToken) {
    return getSharedConversationAction({ token: shareToken, conversationId });
  }
  return getConversationAction({ conversationId });
};

export class ConversationService {
  static readonly correctMetricMutationKey = [ConversationKey.correctMetric];

  static getDetailKey({ conversationId }: { conversationId: number }) {
    return [ConversationKey.detail, conversationId];
  }

  static getConversationQuery({
    conversationId,
    shareToken = null,
  }: ConversationQueryArgs) {
    return queryOptions({
      queryKey: [ConversationKey.detail, conversationId, shareToken],
      queryFn: () =>
        deferAction(() => loadConversation({ conversationId, shareToken })),
    });
  }
}
