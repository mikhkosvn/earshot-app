import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { CallEvaluationStatus } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import {
  REVIEW_STATUSES,
  SUCCESS_STATUSES,
} from '@/server/call-logs/constants/call-review';
import { durationSecondsOf } from '@/server/call-logs/utils/call-log-row';
import {
  formatCallDuration,
  formatTranscriptTime,
} from '@/server/call-logs/utils/payload/format-call-duration';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';

export const publicCallLogSelect = {
  id: true,
  externalCallId: true,
  customerNumber: true,
  status: true,
  evaluationStatus: true,
  feedback: true,
  errorMessage: true,
  createdAt: true,
  updatedAt: true,
  agentId: true,
  projectId: true,
  agent: { select: { name: true } },
  conversation: {
    select: {
      startedAt: true,
      endedAt: true,
      endedReason: true,
      metadata: true,
      dynamicVariables: true,
      testingChannelIndex: true,
      recordingFileId: true,
      turns: {
        orderBy: { position: Prisma.SortOrder.asc },
        select: { role: true, content: true, startTime: true, endTime: true },
      },
      metricEvaluations: {
        orderBy: { metric: { displayOrder: Prisma.SortOrder.asc } },
        select: {
          metricId: true,
          valueNumber: true,
          valueBoolean: true,
          valueText: true,
          normalizedScore: true,
          explanation: true,
          extra: true,
          metric: { select: { name: true, evalType: true } },
        },
      },
    },
  },
} satisfies Prisma.CallLogSelect;

export type PublicCallLogRecord = Prisma.CallLogGetPayload<{
  select: typeof publicCallLogSelect;
}>;

type Conversation = PublicCallLogRecord['conversation'];

const successOf = (status: CallEvaluationStatus | null) => {
  if (!status) return null;
  return SUCCESS_STATUSES.includes(status);
};

const publicStatusOf = (record: PublicCallLogRecord) =>
  record.evaluationStatus ?? record.status;

const metricsOf = (conversation: Conversation) =>
  conversation.metricEvaluations.map((evaluation) => ({
    id: evaluation.metricId,
    name: evaluation.metric.name,
    type: evaluation.metric.evalType,
    score: valueFromParts({
      number: evaluation.valueNumber,
      boolean: evaluation.valueBoolean,
      text: evaluation.valueText,
    }),
    score_normalized: evaluation.normalizedScore,
    explanation: evaluation.explanation.join('\n'),
    extra: evaluation.extra ?? {},
  }));

const transcriptObjectOf = (conversation: Conversation) =>
  conversation.turns.map((turn) => ({
    role: TranscriptRoleLabel[turn.role],
    content: turn.content,
    start_time: turn.startTime,
    end_time: turn.endTime,
    time: formatTranscriptTime(turn.startTime),
  }));

const transcriptOf = (conversation: Conversation) =>
  conversation.turns
    .map(
      (turn) =>
        `[${formatTranscriptTime(turn.startTime)}] ${TranscriptRoleLabel[turn.role]}: ${turn.content}`,
    )
    .join('\n');

const recordingUrlOf = (conversation: Conversation, origin: string | null) => {
  if (!conversation.recordingFileId) return null;
  const path = UrlGenerator.file({ fileId: conversation.recordingFileId });
  if (!origin) return path;
  return new URL(path, origin).toString();
};

const timestampOf = (record: PublicCallLogRecord) =>
  (record.conversation.startedAt ?? record.createdAt).toISOString();

export const toPublicCallLogListItem = (record: PublicCallLogRecord) => ({
  id: record.id,
  call_id: record.externalCallId,
  agent: record.agentId,
  agent_name: record.agent?.name ?? null,
  timestamp: timestampOf(record),
  duration: formatCallDuration(durationSecondsOf(record.conversation)),
  success: successOf(record.evaluationStatus),
  is_reviewed:
    record.evaluationStatus !== null &&
    REVIEW_STATUSES.includes(record.evaluationStatus),
  status: publicStatusOf(record),
  feedback: record.feedback ?? '',
  metrics: metricsOf(record.conversation),
  call_ended_reason: record.conversation.endedReason ?? '',
  customer_number: record.customerNumber ?? '',
  error_message: record.errorMessage,
  created_at: record.createdAt.toISOString(),
  updated_at: record.updatedAt.toISOString(),
});

export const toPublicCallLog = (
  record: PublicCallLogRecord,
  origin: string | null,
) => ({
  ...toPublicCallLogListItem(record),
  project: record.projectId,
  voice_recording_url: recordingUrlOf(record.conversation, origin),
  transcript: transcriptOf(record.conversation),
  transcript_object: transcriptObjectOf(record.conversation),
  evaluation: { metrics: metricsOf(record.conversation) },
  metadata: record.conversation.metadata ?? {},
  dynamic_variables: record.conversation.dynamicVariables ?? {},
  testing_channel_index: record.conversation.testingChannelIndex,
});

export type PublicCallLog = ReturnType<typeof toPublicCallLog>;
