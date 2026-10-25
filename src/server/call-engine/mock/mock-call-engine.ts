import 'server-only';

import { randomUUID } from 'node:crypto';

import { createRandom, type Random } from '@/server/call-engine/audio/random';
import { synthesizeCallAudio } from '@/server/call-engine/audio/synthesize-call-audio';
import {
  CallEndedReason,
  CallEngineKind,
  CallEventType,
  TranscriptRole,
} from '@/server/call-engine/constants';
import { buildConversationScript } from '@/server/call-engine/mock/build-conversation-script';
import { deliverMockEvent } from '@/server/call-engine/mock/deliver-mock-event';
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
  CallEventPayload,
  StartCallRequest,
  StartedCall,
  TranscriptTurn,
} from '@/server/call-engine/types';

interface EndOfCallArgs {
  request: StartCallRequest;
  providerCallId: string;
  endedReason: CallEndedReason;
  durationSeconds: number;
  ringingSeconds: number | null;
  turns: TranscriptTurn[];
  recordingUrl: string | null;
}

const DEFAULT_SPEEDUP = 10;
const NO_ANSWER_RING_SECONDS = 30;
const MOCK_RECORDING_BASE_URL = 'https://mock.invalid/recordings/';

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

const waitForCall = async (callSeconds: number, startedMs: number) => {
  const targetMs = (callSeconds * 1000) / speedup();
  await waitFor(targetMs - (Date.now() - startedMs));
};

const mockRecordingUrl = (providerCallId: string) =>
  `${MOCK_RECORDING_BASE_URL}${providerCallId}.wav`;

const endOfCallPayload = (args: EndOfCallArgs): CallEventPayload => {
  const endedAt = new Date();
  const startedAt = new Date(endedAt.getTime() - args.durationSeconds * 1000);
  return {
    type: CallEventType.end_of_call,
    call_ref: args.request.call_ref,
    provider_call_id: args.providerCallId,
    ended_reason: args.endedReason,
    started_at: startedAt.toISOString(),
    ended_at: endedAt.toISOString(),
    ringing_seconds: args.ringingSeconds,
    transcript: args.turns.map((turn) => ({
      role: turn.role,
      content: turn.content,
      start_time: turn.startTime,
      end_time: turn.endTime,
    })),
    recording_url: args.recordingUrl,
    provider_call_data: {},
  };
};

const runUnansweredCall = async (
  request: StartCallRequest,
  providerCallId: string,
  startedMs: number,
) => {
  await waitForCall(NO_ANSWER_RING_SECONDS, startedMs);
  await deliverMockEvent(
    endOfCallPayload({
      request,
      providerCallId,
      endedReason: CallEndedReason.no_answer,
      durationSeconds: 0,
      ringingSeconds: NO_ANSWER_RING_SECONDS,
      turns: [],
      recordingUrl: null,
    }),
    null,
  );
};

const runAnsweredCall = async (
  request: StartCallRequest,
  providerCallId: string,
  startedMs: number,
  random: Random,
) => {
  const script = await buildConversationScript(request);
  const testingVoice = testingAgentVoice(request.caller);
  const schedule = scheduleTurns({
    script,
    rates: {
      [TranscriptRole.main_agent]: MAIN_AGENT_VOICE.wordsPerSecond,
      [TranscriptRole.testing_agent]: testingVoice.wordsPerSecond,
    },
    maxDurationSeconds: request.max_duration_seconds,
    fastCaller: isFastCaller(request.caller),
    random,
  });
  const recording = synthesizeCallAudio({
    turns: schedule.turns,
    durationSeconds: schedule.durationSeconds,
    voices: {
      [TranscriptRole.main_agent]: MAIN_AGENT_VOICE,
      [TranscriptRole.testing_agent]: testingVoice,
    },
    backgroundNoise: backgroundNoiseLevel(request.caller),
    random,
  });
  await waitForCall(schedule.durationSeconds, startedMs);
  await deliverMockEvent(
    endOfCallPayload({
      request,
      providerCallId,
      endedReason: schedule.endedReason,
      durationSeconds: schedule.durationSeconds,
      ringingSeconds: Math.round(random.between(0, 0.5) * 100) / 100,
      turns: schedule.turns,
      recordingUrl: mockRecordingUrl(providerCallId),
    }),
    recording,
  );
};

const runMockCall = async (
  request: StartCallRequest,
  providerCallId: string,
) => {
  const startedMs = Date.now();
  const random = createRandom(providerCallId);
  if (random.next() < failureRate()) {
    await runUnansweredCall(request, providerCallId, startedMs);
    return;
  }
  await runAnsweredCall(request, providerCallId, startedMs, random);
};

const reportFailedCall = async (
  request: StartCallRequest,
  providerCallId: string,
  error: unknown,
) => {
  console.error(`[call-engine] The mock call ${providerCallId} failed.`, error);
  await deliverMockEvent(
    endOfCallPayload({
      request,
      providerCallId,
      endedReason: CallEndedReason.error,
      durationSeconds: 0,
      ringingSeconds: null,
      turns: [],
      recordingUrl: null,
    }),
    null,
  );
};

const startMockCall = (request: StartCallRequest): Promise<StartedCall> => {
  const providerCallId = `${CallEngineKind.mock}_${randomUUID()}`;
  void runMockCall(request, providerCallId)
    .catch((error: unknown) => reportFailedCall(request, providerCallId, error))
    .catch((error: unknown) =>
      console.error(
        `[call-engine] The mock call ${providerCallId} did not report its end.`,
        error,
      ),
    );
  return Promise.resolve({ providerCallId });
};

export const mockCallEngine: CallEngine = {
  startCall: startMockCall,
};
