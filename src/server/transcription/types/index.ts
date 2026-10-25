import type { TranscriptRole } from '@/server/call-engine/constants';

export type TranscriptionFile = {
  data: Uint8Array;
  contentType: string;
  fileName: string;
};

export type TranscriptionContext = {
  agentName: string;
  agentDescription: string;
};

export type TranscribeRecordingInput = {
  file: TranscriptionFile;
  context?: TranscriptionContext;
};

export type TranscribedTurn = {
  role: TranscriptRole;
  content: string;
  startTime: number;
  endTime: number;
};

export type Transcription = {
  turns: TranscribedTurn[];
  durationSeconds: number | null;
  testingChannelIndex: number | null;
};

export type TranscriptionEngine = {
  transcribe: (input: TranscribeRecordingInput) => Promise<Transcription>;
};

export type SpeechSegment = {
  start: number;
  end: number;
};

export type TurnSlot = {
  role: TranscriptRole;
  startTime: number;
  endTime: number;
};
