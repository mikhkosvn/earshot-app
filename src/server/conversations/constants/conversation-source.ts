export const ConversationSource = {
  run: 'run',
  call: 'call',
} as const;

export type ConversationSource =
  (typeof ConversationSource)[keyof typeof ConversationSource];
