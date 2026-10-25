'use server';

import { getConversation } from '@/server/conversations/get-conversation';
import type {
  ConversationDetail,
  GetConversationInput,
} from '@/server/conversations/types';

export async function getConversationAction(
  args: GetConversationInput,
): Promise<ConversationDetail> {
  return getConversation(args);
}
