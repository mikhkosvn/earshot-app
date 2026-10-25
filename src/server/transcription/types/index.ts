import type { TranscriptRole } from '@/server/call-engine/constants';

export interface TranscriptionFile {
  data: Uint8Array;
  contentType: string;
  fileName: string;
}

export interface TranscriptionContext {
  agentName: string;
  agentDescription: string;
}

export interface TranscribeRecordingInput {
  file: TranscriptionFile;
  context?: TranscriptionContext;
}

export interface TranscribedTurn {
  role: TranscriptRole;
  content: string;
  startTime: number;
  endTime: number;
}

export interface Transcription {
  turns: TranscribedTurn[];
  durationSeconds: number | null;
  testingChannelIndex: number | null;
}

export interface TranscriptionEngine {
  transcribe: (input: TranscribeRecordingInput) => Promise<Transcription>;
}

export interface SpeechSegment {
  start: number;
  end: number;
}

export interface TurnSlot {
  role: TranscriptRole;
  startTime: number;
  endTime: number;
}
