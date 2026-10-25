export const ConversationsActionOperation = {
  getConversation: 'conversations.get_conversation',
} as const;

export type ConversationsActionOperation =
  (typeof ConversationsActionOperation)[keyof typeof ConversationsActionOperation];
