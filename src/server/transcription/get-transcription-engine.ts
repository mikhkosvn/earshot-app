import 'server-only';

import { TranscriptionEngineKind } from '@/server/transcription/constants';
import { mockTranscriptionEngine } from '@/server/transcription/mock/mock-transcription-engine';
import type { TranscriptionEngine } from '@/server/transcription/types';

export const getTranscriptionEngine = (): TranscriptionEngine => {
  const kind = process.env.TRANSCRIPTION_ENGINE || TranscriptionEngineKind.mock;
  if (kind === TranscriptionEngineKind.mock) return mockTranscriptionEngine;
  throw new Error(`The transcription engine "${kind}" is not available.`);
};
