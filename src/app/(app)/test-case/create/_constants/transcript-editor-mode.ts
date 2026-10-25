export const TranscriptEditorMode = {
  chat: 'chat',
  json: 'json',
} as const;

export type TranscriptEditorMode =
  (typeof TranscriptEditorMode)[keyof typeof TranscriptEditorMode];
