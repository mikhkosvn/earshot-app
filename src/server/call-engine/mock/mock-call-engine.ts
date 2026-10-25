import 'server-only';

import { randomUUID } from 'node:crypto';

import { createRandom } from '@/server/call-engine/audio/random';
import { synthesizeCallAudio } from '@/server/call-engine/audio/synthesize-call-audio';
import {
  CALL_ENDED_REASON_LABEL,
  CallEndedReason,
  CallEngineKind,
  TranscriptRole,
} from '@/server/call-engine/constants';
import { buildConversationScript } from '@/server/call-engine/mock/build-conversation-script';
import {
  backgroundNoiseLevel,
  isFastCaller,
  MAIN_AGENT_VOICE,
  testingAgentVoice,
} from '@/server/call-engine/mock/personality-voice';
import { scheduleTurns } from '@/server/call-engine/mock/schedule-turns';
import { waitFor } from '@/server/call-engine/mock/wait-for';
import type {
  CallEngine,
  PlaceCallInput,
  PlacedCall,
} from '@/server/call-engine/types';

const DEFAULT_SPEEDUP = 10;
const NO_ANSWER_RING_SECONDS = 30;

const readNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  if (!value || !Number.isFinite(parsed)) return fallback;
  return parsed;
};

const speedup = () => {
  const value = readNumber(process.env.MOCK_CALL_SPEEDUP, DEFAULT_SPEEDUP);
  if (value <= 0) return DEFAULT_SPEEDUP;
  return value;
};

const failureRate = () =>
  Math.min(1, Math.max(0, readNumber(process.env.MOCK_CALL_FAILURE_RATE, 0)));

const waitForCall = async (
  callSeconds: number,
  startedMs: number,
  signal?: AbortSignal,
) => {
  const targetMs = (callSeconds * 1000) / speedup();
  await waitFor(targetMs - (Date.now() - startedMs), signal);
};

const buildMetadata = (args: {
  endedReason: CallEndedReason;
  startedAt: Date;
  endedAt: Date;
  ringingSeconds: number;
}) => ({
  ended_reason: CALL_ENDED_REASON_LABEL[args.endedReason],
  call_ended_at: args.endedAt.toISOString(),
  call_created_at: args.startedAt.toISOString(),
  call_started_at: args.startedAt.toISOString(),
  ringing_duration: args.ringingSeconds,
  provider_call_data: {},
});

const placeUnansweredCall = async (
  providerCallId: string,
  startedMs: number,
  signal?: AbortSignal,
): Promise<PlacedCall> => {
  await waitForCall(NO_ANSWER_RING_SECONDS, startedMs, signal);
  const endedAt = new Date();
  const startedAt = new Date(endedAt.getTime() - NO_ANSWER_RING_SECONDS * 1000);
  return {
    turns: [],
    recording: null,
    waveform: null,
    durationSeconds: 0,
    endedReason: CallEndedReason.no_answer,
    startedAt,
    endedAt,
    providerCallId,
    providerCallData: {},
    metadata: buildMetadata({
      endedReason: CallEndedReason.no_answer,
      startedAt,
      endedAt,
      ringingSeconds: NO_ANSWER_RING_SECONDS,
    }),
  };
};

const placeMockCall = async (
  input: PlaceCallInput,
  signal?: AbortSignal,
): Promise<PlacedCall> => {
  const startedMs = Date.now();
  const providerCallId = `${CallEngineKind.mock}_${randomUUID()}`;
  const random = createRandom(providerCallId);
  if (random.next() < failureRate()) {
    return placeUnansweredCall(providerCallId, startedMs, signal);
  }
  const script = await buildConversationScript(input);
  signal?.throwIfAborted();
  const testingVoice = testingAgentVoice(input.personality);
  const schedule = scheduleTurns({
    script,
    rates: {
      [TranscriptRole.main_agent]: MAIN_AGENT_VOICE.wordsPerSecond,
      [TranscriptRole.testing_agent]: testingVoice.wordsPerSecond,
    },
    maxDurationSeconds: input.maxDurationSeconds,
    fastCaller: isFastCaller(input.personality),
    random,
  });
  const { recording, waveform } = synthesizeCallAudio({
    turns: schedule.turns,
    durationSeconds: schedule.durationSeconds,
    voices: {
      [TranscriptRole.main_agent]: MAIN_AGENT_VOICE,
      [TranscriptRole.testing_agent]: testingVoice,
    },
    backgroundNoise: backgroundNoiseLevel(input.personality),
    random,
  });
  await waitForCall(recording.durationSeconds, startedMs, signal);
  const endedAt = new Date();
  const startedAt = new Date(
    endedAt.getTime() - recording.durationSeconds * 1000,
  );
  const ringingSeconds = Math.round(random.between(0, 0.5) * 100) / 100;
  return {
    turns: schedule.turns,
    recording,
    waveform,
    durationSeconds: recording.durationSeconds,
    endedReason: schedule.endedReason,
    startedAt,
    endedAt,
    providerCallId,
    providerCallData: {},
    metadata: buildMetadata({
      endedReason: schedule.endedReason,
      startedAt,
      endedAt,
      ringingSeconds,
    }),
  };
};

export const mockCallEngine: CallEngine = {
  placeCall: placeMockCall,
};
