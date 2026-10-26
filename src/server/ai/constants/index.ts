export const DEFAULT_AI_MODEL = 'claude-sonnet-5-5';
export const DEFAULT_MAX_TOKENS = 16000;

export const AiOperation = {
  messages_create: 'messages.create',
} as const;

export type AiOperation = (typeof AiOperation)[keyof typeof AiOperation];
