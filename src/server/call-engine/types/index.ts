import type {
  CallDirection,
  CallEndedReason,
  TranscriptRole,
} from '@/server/call-engine/constants';

export type CallVariable = {
  key: string;
  value: string;
};

export type CallAgent = {
  id: number;
  name: string;
  description: string;
  language: string;
  phoneNumber: string | null;
};

export type CallEvaluator = {
  name: string;
  instructions: string;
  expectedOutcome: string;
  firstMessage: string | null;
};

export type CallPersonality = {
  name: string;
  gender: string;
  language: string;
  speed: string;
  interruptionLevel: string;
  backgroundNoise: string;
};

export type PlaceCallInput = {
  direction: CallDirection;
  agent: CallAgent;
  evaluator: CallEvaluator;
  personality: CallPersonality;
  mainAgentVariables: CallVariable[];
  testingAgentVariables: CallVariable[];
  maxDurationSeconds: number;
};

export type TranscriptTurn = {
  role: TranscriptRole;
  content: string;
  startTime: number;
  endTime: number;
};

export type CallRecording = {
  data: Uint8Array;
  contentType: string;
  durationSeconds: number;
  sampleRate: number;
  channels: number;
  testingChannelIndex: number;
};

export type CallWaveform = {
  version: number;
  peaks: number[][];
  duration: number;
  sampleRate: number;
  testingChannelIndex: number;
  mainSpeaking: number;
  testingSpeaking: number;
};

export type PlacedCall = {
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
};

export type CallEngine = {
  placeCall: (
    input: PlaceCallInput,
    signal?: AbortSignal,
  ) => Promise<PlacedCall>;
};
