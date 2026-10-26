export const VoicesActionOperation = {
  listVoices: 'voices.list_voices',
  cloneVoice: 'voices.clone_voice',
} as const;

export type VoicesActionOperation =
  (typeof VoicesActionOperation)[keyof typeof VoicesActionOperation];
