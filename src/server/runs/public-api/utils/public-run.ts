import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { CallEvaluationStatus } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import {
  REVIEW_STATUSES,
  SUCCESS_STATUSES,
} from '@/server/call-logs/constants/call-review';
import { durationSecondsOf } from '@/server/call-logs/utils/call-log-row';
import { formatCallDuration } from '@/server/call-logs/utils/payload/format-call-duration';
import { MetadataKey } from '@/server/conversations/constants/metadata-keys';
import { endedReasonLabel } from '@/server/conversations/utils/ended-reason-label';
import type { RubricVerdict } from '@/server/metric-scoring/types';
import { toPublicPersonalityId } from '@/server/personalities/public-api/public-personality-id';
import { PublicRunType } from '@/server/runs/public-api/constants';
import { storedScenarioTypeSchema } from '@/server/runs/public-api/schemas';
import {
  toPublicRubricItem,
  toPublicRunMetrics,
} from '@/server/runs/public-api/utils/public-run-metrics';
import type { PublicRunRow } from '@/server/runs/public-api/utils/public-run-select';
import { appUrl } from '@/server/runs/utils/app-url';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';

type Conversation = PublicRunRow['conversation'];

const asRecord = (value: Prisma.JsonValue | null): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value;
};

const successOf = (status: CallEvaluationStatus | null) => {
  if (!status) return false;
  return SUCCESS_STATUSES.includes(status);
};

const isReviewedOf = (status: CallEvaluationStatus | null) => {
  if (!status) return false;
  return REVIEW_STATUSES.includes(status);
};

const scenarioTypeOf = (row: PublicRunRow) => {
  if (row.evaluator) return row.evaluator.scenarioType;
  return storedScenarioTypeSchema.parse(row.evaluatorSnapshot).scenarioType;
};

const personalityIdOf = (row: PublicRunRow) => {
  if (!row.personality) return null;
  return toPublicPersonalityId(row.personality);
};

const transcriptOf = (conversation: Conversation) =>
  conversation.turns
    .map((turn) => `${TRANSCRIPT_ROLE_LABEL[turn.role]}: ${turn.content}`)
    .join('\n');

const transcriptObjectOf = (conversation: Conversation) =>
  conversation.turns.map((turn) => ({
    role: TRANSCRIPT_ROLE_LABEL[turn.role],
    content: turn.content,
    start_time: turn.startTime,
    end_time: turn.endTime,
  }));

const durationOf = (conversation: Conversation) => {
  const seconds = durationSecondsOf(conversation);
  if (seconds === null) return null;
  return formatCallDuration(seconds);
};

const recordingUrlOf = (conversation: Conversation) => {
  if (!conversation.recordingFileId) return null;
  return appUrl(UrlGenerator.file({ fileId: conversation.recordingFileId }));
};

const metadataOf = (conversation: Conversation) => {
  const metadata = asRecord(conversation.metadata);
  return {
    ...metadata,
    [MetadataKey.endedReason]:
      metadata[MetadataKey.endedReason] ??
      endedReasonLabel(conversation.endedReason) ??
      '',
  };
};

const agentNumberOf = (row: PublicRunRow) =>
  row.result.agentNumber ?? row.result.agent?.phoneNumber ?? null;

export const toPublicRun = (row: PublicRunRow, rubric: RubricVerdict) => {
  const snapshot = readEvaluatorSnapshot(row.evaluatorSnapshot);
  const conversation = row.conversation;
  return {
    id: row.id,
    result_id: row.resultId,
    result_name: row.result.name,
    agent: row.result.agentId,
    agent_name: row.result.agent?.name ?? null,
    scenario: row.evaluatorId,
    scenario_name: row.evaluator?.name ?? snapshot.name,
    scenario_type: scenarioTypeOf(row),
    personality: personalityIdOf(row),
    personality_name: row.personality?.name ?? null,
    status: row.status,
    evaluation_status: row.evaluationStatus,
    success: successOf(row.evaluationStatus),
    evaluation: {
      metrics: toPublicRunMetrics(conversation.metricEvaluations, rubric),
    },
    rubric: rubric.items.map(toPublicRubricItem),
    expected_outcome_prompt:
      snapshot.expectedOutcomePrompt ??
      row.evaluator?.expectedOutcomePrompt ??
      '',
    transcript: transcriptOf(conversation),
    transcript_object: transcriptObjectOf(conversation),
    duration: durationOf(conversation),
    voice_recording_url: recordingUrlOf(conversation),
    metadata: metadataOf(conversation),
    provider_call_id: conversation.providerCallId,
    provider_call_details: conversation.providerCallData,
    test_profile_data: row.testProfileSnapshot,
    inbound_number: row.callerNumber,
    agent_number: agentNumberOf(row),
    error_message: row.errorMessage ?? '',
    feedback: row.feedback,
    is_reviewed: isReviewedOf(row.evaluationStatus),
    executed_at: row.executedAt,
    timestamp: row.createdAt,
    run_type: PublicRunType.voice,
    mocked_tool_names: row.result.mockTools.map((entry) => entry.mockTool.name),
    generated_mock_tool_entries: [],
    critical_categories: [],
    outbound_dial_window_opens_at: null,
    outbound_dial_window_seconds: null,
    outbound_dial_window_closes_at: null,
  };
};
