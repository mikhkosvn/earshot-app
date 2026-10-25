import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import {
  type DecodedWav,
  decodeWav,
} from '@/server/call-engine/audio/decode-wav';
import {
  MAIN_CHANNEL_INDEX,
  TESTING_CHANNEL_INDEX,
} from '@/server/call-engine/constants';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { readFileBytes } from '@/server/files/read-file-bytes';
import {
  MetricScoringStep,
  ScoringSource,
} from '@/server/metric-scoring/constants';
import type {
  ScoringAgent,
  ScoringConversation,
  ScoringEvaluator,
} from '@/server/metric-scoring/types';

const WAV_CONTENT_TYPES = ['audio/wav', 'audio/x-wav', 'audio/wave'];

const agentSelect = {
  id: true,
  name: true,
  description: true,
  language: true,
  inbound: true,
  phoneNumber: true,
} satisfies Prisma.AgentSelect;

const conversationSelect = {
  id: true,
  projectId: true,
  testingChannelIndex: true,
  startedAt: true,
  endedAt: true,
  endedReason: true,
  providerCallData: true,
  metadata: true,
  dynamicVariables: true,
  recordingFile: {
    select: { id: true, storageKey: true, contentType: true },
  },
  turns: {
    orderBy: { position: Prisma.SortOrder.asc },
    select: { role: true, content: true, startTime: true, endTime: true },
  },
  project: { select: { sampleRate: true } },
  run: {
    select: {
      id: true,
      evaluatorSnapshot: true,
      evaluator: {
        select: {
          id: true,
          name: true,
          instructions: true,
          expectedOutcomePrompt: true,
          metrics: { select: { metricId: true } },
        },
      },
      testProfile: {
        select: { variables: { select: { key: true, value: true } } },
      },
      result: { select: { agent: { select: agentSelect } } },
    },
  },
  callLog: {
    select: { id: true, agent: { select: agentSelect } },
  },
} satisfies Prisma.ConversationSelect;

type ConversationRow = Prisma.ConversationGetPayload<{
  select: typeof conversationSelect;
}>;

const asRecord = (value: Prisma.JsonValue | null): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value;
};

const readText = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'string') return value;
  return null;
};

const loadRecording = async (
  file: ConversationRow['recordingFile'],
): Promise<DecodedWav | null> => {
  if (!file || !WAV_CONTENT_TYPES.includes(file.contentType)) return null;
  try {
    return decodeWav(await readFileBytes(file));
  } catch (error) {
    recordStepFailure(MetricScoringStep.recording_load, error);
    return null;
  }
};

const recordingUrlOf = (file: ConversationRow['recordingFile']) => {
  if (!file) return null;
  return UrlGenerator.file({ fileId: file.id });
};

const sourceOf = (row: ConversationRow) => {
  if (row.run) return ScoringSource.simulation;
  if (row.callLog) return ScoringSource.observability;
  return ScoringSource.standalone;
};

const agentOf = (row: ConversationRow): ScoringAgent | null =>
  row.run?.result.agent ?? row.callLog?.agent ?? null;

const evaluatorOf = (row: ConversationRow): ScoringEvaluator | null => {
  if (!row.run) return null;
  const snapshot = asRecord(row.run.evaluatorSnapshot);
  const evaluator = row.run.evaluator;
  return {
    id: evaluator?.id ?? 0,
    name: evaluator?.name ?? readText(snapshot, 'name') ?? '',
    instructions:
      evaluator?.instructions ?? readText(snapshot, 'instructions') ?? '',
    expectedOutcome:
      evaluator?.expectedOutcomePrompt ??
      readText(snapshot, 'expectedOutcomePrompt'),
    metricIds: evaluator?.metrics.map((metric) => metric.metricId) ?? [],
  };
};

const mainChannelOf = (testingChannelIndex: number | null) => {
  if (testingChannelIndex === MAIN_CHANNEL_INDEX) return TESTING_CHANNEL_INDEX;
  return MAIN_CHANNEL_INDEX;
};

const durationOf = (row: ConversationRow, recording: DecodedWav | null) => {
  if (recording) return recording.durationSeconds;
  if (row.startedAt && row.endedAt) {
    return (row.endedAt.getTime() - row.startedAt.getTime()) / 1000;
  }
  return Math.max(0, ...row.turns.map((turn) => turn.endTime ?? 0));
};

export const loadConversation = async (
  projectId: number,
  conversationId: number,
): Promise<ScoringConversation> => {
  const row = await prisma.conversation.findUniqueOrThrow({
    where: { id: conversationId, projectId },
    select: conversationSelect,
  });
  const recording = await loadRecording(row.recordingFile);
  const source = sourceOf(row);
  addEventFields({
    conversation: {
      id: row.id,
      source,
      turn_count: row.turns.length,
      has_recording: recording !== null,
    },
    project: { id: row.projectId },
  });
  return {
    id: row.id,
    projectId: row.projectId,
    source,
    runId: row.run?.id ?? null,
    callLogId: row.callLog?.id ?? null,
    turns: row.turns,
    recording,
    recordingUrl: recordingUrlOf(row.recordingFile),
    mainChannelIndex: mainChannelOf(row.testingChannelIndex),
    durationSeconds: durationOf(row, recording),
    endedReason: row.endedReason,
    startedAt: row.startedAt,
    metadata: asRecord(row.metadata),
    dynamicVariables: asRecord(row.dynamicVariables),
    providerCallData: asRecord(row.providerCallData),
    testProfile: Object.fromEntries(
      (row.run?.testProfile?.variables ?? []).map((variable) => [
        variable.key,
        variable.value,
      ]),
    ),
    agent: agentOf(row),
    evaluator: evaluatorOf(row),
    projectSampleRate: row.project.sampleRate,
  };
};
