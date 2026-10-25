import type { z } from 'zod';

import type {
  BackgroundNoise,
  InterruptionLevel,
  Language,
  VoiceModel,
} from '@/generated/prisma/enums';
import type {
  CallDirection,
  CallEndedReason,
  TranscriptRole,
} from '@/server/call-engine/constants';
import type {
  callEventSchema,
  endOfCallEventSchema,
  pubSubPushSchema,
} from '@/server/call-engine/schemas';
import type { TraceContext } from '@/server/common/logging/types';

export interface CallerSetup {
  instructions: string;
  first_message: string | null;
  variables: Record<string, string>;
  prompt: string;
  language: Language;
  accent: string | null;
  voice_model: VoiceModel | null;
  voice_id: string | null;
  speed: number | null;
  interruption_level: InterruptionLevel;
  background_noise: BackgroundNoise;
}

export interface StartCallRequest {
  call_ref: string;
  direction: CallDirection;
  to_number: string;
  from_number: string | null;
  max_duration_seconds: number;
  caller: CallerSetup;
  trace_context?: TraceContext;
}

export interface StartedCall {
  providerCallId: string;
}

export type CallEvent = z.output<typeof callEventSchema>;
export type CallEventPayload = z.input<typeof callEventSchema>;
export type EndOfCallEvent = z.output<typeof endOfCallEventSchema>;
export type PubSubPush = z.output<typeof pubSubPushSchema>;

export interface TranscriptTurn {
  role: TranscriptRole;
  content: string;
  startTime: number;
  endTime: number;
}

export interface RecordingFile {
  data: Uint8Array;
  contentType: string;
}

export type RecordingLoader = (url: string) => Promise<RecordingFile>;

export interface CallRecording extends RecordingFile {
  testingChannelIndex: number | null;
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
  startCall: (request: StartCallRequest) => Promise<StartedCall>;
}
