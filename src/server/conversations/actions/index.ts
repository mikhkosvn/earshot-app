'use server';

import { getConversation } from '@/server/conversations/get-conversation';
import type {
  ConversationDetail,
  GetConversationInput,
} from '@/server/conversations/types';
import { ConversationsActionOperation } from '@/server/conversations/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getConversationAction(
  args: GetConversationInput,
): Promise<ConversationDetail> {
  return withActionEvent(ConversationsActionOperation.getConversation, () =>
    getConversation(args),
  );
}
