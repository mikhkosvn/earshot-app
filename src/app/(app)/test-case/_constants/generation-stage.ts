export const GenerationStage = {
  idle: 'idle',
  thinking: 'thinking',
  question: 'question',
  generating: 'generating',
  done: 'done',
  failed: 'failed',
} as const;

export type GenerationStage =
  (typeof GenerationStage)[keyof typeof GenerationStage];

export const SheetTab = {
  chat: 'chat',
  history: 'history',
} as const;

export type SheetTab = (typeof SheetTab)[keyof typeof SheetTab];
