import 'server-only';

import { getTranscriptionEngine } from '@/server/transcription/get-transcription-engine';
import type { TranscribeRecordingInput } from '@/server/transcription/types';

export const transcribeRecording = (input: TranscribeRecordingInput) =>
  getTranscriptionEngine().transcribe(input);
