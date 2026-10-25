import type {
  CallDirection,
  CallEndedReason,
  TranscriptRole,
} from '@/server/call-engine/constants';

export interface CallVariable {
  key: string;
  value: string;
}

export interface CallAgent {
  id: number;
  name: string;
  description: string;
  language: string;
  phoneNumber: string | null;
}

export interface CallEvaluator {
  name: string;
  instructions: string;
  expectedOutcome: string;
  firstMessage: string | null;
}

export interface CallPersonality {
  name: string;
  gender: string;
  language: string;
  speed: string;
  interruptionLevel: string;
  backgroundNoise: string;
}

export interface PlaceCallInput {
  direction: CallDirection;
  agent: CallAgent;
  evaluator: CallEvaluator;
  personality: CallPersonality;
  mainAgentVariables: CallVariable[];
  testingAgentVariables: CallVariable[];
  maxDurationSeconds: number;
}

export interface TranscriptTurn {
  role: TranscriptRole;
  content: string;
  startTime: number;
  endTime: number;
}

export interface CallRecording {
  data: Uint8Array;
  contentType: string;
  durationSeconds: number;
  sampleRate: number;
  channels: number;
  testingChannelIndex: number;
}

export type CallWaveform = {
  version: number;
  peaks: number[][];
  duration: number;
  sampleRate: number;
  testingChannelIndex: number;
  mainSpeaking: number;
  testingSpeaking: number;
};

export interface PlacedCall {
  turns: TranscriptTurn[];
  recording: CallRecording | null;
  waveform: CallWaveform | null;
  durationSeconds: number;
  endedReason: CallEndedReason;
  startedAt: Date;
  endedAt: Date;
  providerCallId: string;
  providerCallData: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface CallEngine {
  placeCall: (
    input: PlaceCallInput,
    signal?: AbortSignal,
  ) => Promise<PlacedCall>;
}
