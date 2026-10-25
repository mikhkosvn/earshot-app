import 'server-only';

import {
  CALL_ENDED_REASON_LABEL,
  type CallEndedReason,
} from '@/server/call-engine/constants';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import { ScoringSource } from '@/server/metric-scoring/constants';
import { turnLatencies } from '@/server/metric-scoring/predefined/timing/turn-latencies';
import type {
  DependencyResult,
  ScoringConversation,
} from '@/server/metric-scoring/types';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';

const KNOWN_REASONS: string[] = Object.keys(CALL_ENDED_REASON_LABEL);

const isCallEndedReason = (value: string): value is CallEndedReason =>
  KNOWN_REASONS.includes(value);

export const callEndReasonText = (conversation: ScoringConversation) => {
  const reason = conversation.endedReason ?? '';
  if (isCallEndedReason(reason)) return CALL_ENDED_REASON_LABEL[reason];
  return reason;
};

export const transcriptJson = (conversation: ScoringConversation) =>
  conversation.turns.map((turn) => ({
    role: TranscriptRoleLabel[turn.role],
    content: turn.content,
    start_time: turn.startTime,
    end_time: turn.endTime,
    time: transcriptTime(turn.startTime),
  }));

export const transcriptText = (conversation: ScoringConversation) =>
  conversation.turns
    .map(
      (turn) =>
        `[${transcriptTime(turn.startTime)}] ${TranscriptRoleLabel[turn.role]}: ${turn.content}`,
    )
    .join('\n');

const callDate = (conversation: ScoringConversation) =>
  conversation.startedAt ?? new Date();

const dependencyMap = (dependencies: DependencyResult[]) => {
  const entries = dependencies.flatMap((dependency) => {
    const value = {
      score: dependency.value,
      value: dependency.value,
      enum: dependency.value,
      explanation: dependency.explanation.join('\n'),
    };
    const keys = [
      dependency.name,
      ...(dependency.slug ? [dependency.slug] : []),
    ];
    return keys.map((key) => [key, value] as const);
  });
  return Object.fromEntries(entries);
};

const simulationOnly = <T>(conversation: ScoringConversation, value: T) => {
  if (conversation.source !== ScoringSource.simulation) return undefined;
  return value;
};

export const judgeTemplateData = (
  conversation: ScoringConversation,
  dependencies: DependencyResult[],
): Record<string, unknown> => ({
  transcript: transcriptText(conversation),
  transcript_json: transcriptJson(conversation),
  date: callDate(conversation).toISOString().slice(0, 10),
  timestamp: callDate(conversation).toISOString(),
  call_end_reason: callEndReasonText(conversation),
  call_duration: Math.round(conversation.durationSeconds),
  agent: {
    description: conversation.agent?.description,
    name: conversation.agent?.name,
    language: conversation.agent?.language,
    inbound: conversation.agent?.inbound,
    contact_number: conversation.agent?.phoneNumber,
  },
  earshot_transcript_json: simulationOnly(
    conversation,
    transcriptJson(conversation),
  ),
  metadata: conversation.metadata,
  dynamic_variables: conversation.dynamicVariables,
  test_profile: conversation.testProfile,
  provider_call_data: conversation.providerCallData,
  evaluator: simulationOnly(conversation, {
    instructions: conversation.evaluator?.instructions,
    conditional_action_instructions: '',
  }),
  metrics: dependencyMap(dependencies),
});

export const pythonData = (
  conversation: ScoringConversation,
  dependencies: DependencyResult[],
): Record<string, unknown> => {
  const latencies = turnLatencies(conversation);
  return {
    transcript: transcriptText(conversation),
    transcript_json: transcriptJson(conversation),
    call_duration: Math.round(conversation.durationSeconds),
    call_end_reason: callEndReasonText(conversation),
    voice_recording: conversation.recordingUrl,
    agent_description: conversation.agent?.description ?? '',
    date: callDate(conversation).toISOString().slice(0, 10),
    timestamp: callDate(conversation).toISOString(),
    metadata: conversation.metadata,
    dynamic_variables: conversation.dynamicVariables,
    call_log_id: conversation.callLogId,
    tags: [],
    provider_call_id: null,
    provider_call_data: conversation.providerCallData,
    earshot_transcript_json: transcriptJson(conversation),
    test_profile: conversation.testProfile,
    run_id: conversation.runId,
    expected_outcome: conversation.evaluator?.expectedOutcome ?? null,
    latency_data: latencies.map((latency) => ({
      latency: latency.latencyMs,
      start_time: latency.startTime,
    })),
    metrics: dependencyMap(dependencies),
    ...Object.fromEntries(
      dependencies.map((dependency) => [dependency.name, dependency.value]),
    ),
  };
};
