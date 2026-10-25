export const TranscriptionEngineKind = {
  mock: 'mock',
} as const;

export type TranscriptionEngineKind =
  (typeof TranscriptionEngineKind)[keyof typeof TranscriptionEngineKind];

export const WAV_CONTENT_TYPES = ['audio/wav', 'audio/x-wav', 'audio/wave'];

export const SPEECH_FRAME_SECONDS = 0.03;
export const SPEECH_RMS_THRESHOLD = 400;
export const MAX_PAUSE_SECONDS = 0.7;
export const MIN_SPEECH_SECONDS = 0.25;
export const SAME_SPEAKER_MERGE_SECONDS = 1.5;

export const TranscriptionStep = {
  wav_decode: 'transcription.wav_decode',
} as const;

export type TranscriptionStep =
  (typeof TranscriptionStep)[keyof typeof TranscriptionStep];
