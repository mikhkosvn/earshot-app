import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import type {
  LabRowSource,
  LabRowView,
  LabScore,
} from '@/server/labs/types';
import { valuesMatch } from '@/server/labs/utils/values-match';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { SampleSource } from '@/server/metrics/constants/pattern-review/sample-source';

const MILLISECONDS_PER_SECOND = 1000;

const sourceSelect = {
  id: true,
  run: { select: { id: true, resultId: true } },
  callLog: { select: { id: true } },
} satisfies Prisma.ConversationSelect;

export const labRowSelect = {
  id: true,
  testSetId: true,
  expectedNumber: true,
  expectedBoolean: true,
  expectedText: true,
  actualNumber: true,
  actualBoolean: true,
  actualText: true,
  actualExplanation: true,
  actualEvaluatedAt: true,
  feedback: true,
  testSet: {
    select: {
      conversation: {
        select: {
          ...sourceSelect,
          projectId: true,
          startedAt: true,
          endedAt: true,
          endedReason: true,
          metadata: true,
          dynamicVariables: true,
          providerCallData: true,
          recordingFileId: true,
          turns: {
            orderBy: { position: Prisma.SortOrder.asc },
            select: { role: true, content: true, startTime: true, endTime: true },
          },
          copiedFrom: { select: sourceSelect },
        },
      },
    },
  },
} satisfies Prisma.LabReviewSelect;

export const labRowOrder = [
  { testSet: { createdAt: Prisma.SortOrder.asc } },
  { id: Prisma.SortOrder.asc },
] satisfies Prisma.LabReviewOrderByWithRelationInput[];

type LabRowRow = Prisma.LabReviewGetPayload<{ select: typeof labRowSelect }>;

type LabConversation = LabRowRow['testSet']['conversation'];

type SourceConversation = Prisma.ConversationGetPayload<{
  select: typeof sourceSelect;
}>;

const asRecord = (value: Prisma.JsonValue | null): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

const sourceOf = (
  projectId: number,
  conversation: SourceConversation,
): LabRowSource | null => {
  if (conversation.run) {
    return {
      kind: SampleSource.run,
      id: conversation.run.id,
      href: UrlGenerator.result({
        projectId,
        resultId: conversation.run.resultId,
        values: { call_id: conversation.run.id },
      }),
    };
  }
  if (conversation.callLog) {
    return {
      kind: SampleSource.call_log,
      id: conversation.callLog.id,
      href: UrlGenerator.calls({
        projectId,
        values: { callId: conversation.callLog.id },
      }),
    };
  }
  return null;
};

const rowSource = (conversation: LabConversation): LabRowSource =>
  sourceOf(conversation.projectId, conversation) ??
  (conversation.copiedFrom &&
    sourceOf(conversation.projectId, conversation.copiedFrom)) ?? {
    kind: SampleSource.conversation,
    id: conversation.id,
    href: null,
  };

const durationOf = (conversation: LabConversation) => {
  if (conversation.startedAt && conversation.endedAt) {
    return (
      (conversation.endedAt.getTime() - conversation.startedAt.getTime()) /
      MILLISECONDS_PER_SECOND
    );
  }
  const ends = conversation.turns.map((turn) => turn.endTime ?? 0);
  if (ends.length === 0) return null;
  return Math.max(...ends);
};

const recordingUrlOf = (conversation: LabConversation) => {
  if (!conversation.recordingFileId) return null;
  return UrlGenerator.file({ fileId: conversation.recordingFileId });
};

export const scoringConversationIdOf = (conversation: {
  id: number;
  copiedFrom: { id: number } | null;
}) => conversation.copiedFrom?.id ?? conversation.id;

export const expectedValueOf = (row: {
  expectedNumber: number | null;
  expectedBoolean: boolean | null;
  expectedText: string | null;
}) =>
  valueFromParts({
    number: row.expectedNumber,
    boolean: row.expectedBoolean,
    text: row.expectedText,
  });

export const actualValueOf = (row: {
  actualNumber: number | null;
  actualBoolean: boolean | null;
  actualText: string | null;
}) =>
  valueFromParts({
    number: row.actualNumber,
    boolean: row.actualBoolean,
    text: row.actualText,
  });

export const toLabRowView = (row: LabRowRow): LabRowView => {
  const conversation = row.testSet.conversation;
  const expected = expectedValueOf(row);
  const actual = actualValueOf(row);
  return {
    reviewId: row.id,
    testSetId: row.testSetId,
    source: rowSource(conversation),
    recordingUrl: recordingUrlOf(conversation),
    durationSeconds: durationOf(conversation),
    transcript: conversation.turns.map(
      (turn) =>
        `[${transcriptTime(turn.startTime)}] ${TRANSCRIPT_ROLE_LABEL[turn.role]}: ${turn.content}`,
    ),
    variables: {
      callEndReason: conversation.endedReason,
      metadata: asRecord(conversation.metadata),
      dynamicVariables: asRecord(conversation.dynamicVariables),
      providerCallData: asRecord(conversation.providerCallData),
    },
    expected,
    actual,
    scored: row.actualEvaluatedAt !== null,
    explanation: row.actualExplanation,
    feedback: row.feedback,
    matched: valuesMatch(expected, actual),
  };
};

export const scoreOf = (rows: { matched: boolean }[]): LabScore => ({
  matched: rows.filter((row) => row.matched).length,
  total: rows.length,
});
