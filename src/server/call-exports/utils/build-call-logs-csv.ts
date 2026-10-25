import 'server-only';

import { CALL_EXPORT_HEADER } from '@/server/call-exports/constants';
import { CallProcessingStatusLabel } from '@/server/call-logs/constants/call-processing-status-labels';
import type { PublicCallLogRecord } from '@/server/call-logs/utils/payload/public-call-log';
import { durationSecondsOf } from '@/server/call-logs/utils/call-log-row';
import { formatCallDuration } from '@/server/call-logs/utils/payload/format-call-duration';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';

type MetricHeader = { id: number; name: string };

const csvCell = (value: string | number | boolean | null) => {
  const text = String(value ?? '');
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
};

const transcriptText = (record: PublicCallLogRecord) =>
  record.conversation.turns
    .map((turn) => `${TranscriptRoleLabel[turn.role]}: ${turn.content}`)
    .join('\n');

const evaluationText = (record: PublicCallLogRecord) => {
  if (!record.evaluationStatus) return '';
  return CallEvaluationStatusLabel[record.evaluationStatus];
};

const metricValue = (record: PublicCallLogRecord, metricId: number) => {
  const evaluation = record.conversation.metricEvaluations.find(
    (item) => item.metricId === metricId,
  );
  if (!evaluation) return null;
  return valueFromParts({
    number: evaluation.valueNumber,
    boolean: evaluation.valueBoolean,
    text: evaluation.valueText,
  });
};

const csvLine = (record: PublicCallLogRecord, metrics: MetricHeader[]) =>
  [
    record.externalCallId,
    (record.conversation.startedAt ?? record.createdAt).toISOString(),
    formatCallDuration(durationSecondsOf(record.conversation)),
    record.agent?.name ?? '',
    record.customerNumber,
    record.conversation.endedReason,
    CallProcessingStatusLabel[record.status],
    evaluationText(record),
    record.feedback,
    transcriptText(record),
    ...metrics.map((metric) => metricValue(record, metric.id)),
  ]
    .map(csvCell)
    .join(',');

export const buildCallLogsCsv = (
  records: PublicCallLogRecord[],
  metrics: MetricHeader[],
) =>
  [
    [...CALL_EXPORT_HEADER, ...metrics.map((metric) => metric.name)]
      .map(csvCell)
      .join(','),
    ...records.map((record) => csvLine(record, metrics)),
  ].join('\n');
