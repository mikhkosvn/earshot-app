import { format } from 'date-fns';

import type {
  CallEvaluationStatus,
  RunStatus,
} from '@/generated/prisma/enums';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import type { NamedRef } from '@/server/results/types';

const DATE_TIME_FORMAT = "MMM d, yyyy 'at' hh:mm a";

const TABLE_DATE_FORMAT = 'MMM d, yyyy, h:mm a';

const SECONDS_PER_MINUTE = 60;

const NUMBER_FORMAT = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

export const EMPTY_VALUE = '—';

const pad = (value: number) => String(value).padStart(2, '0');

export const dateTimeText = (date: Date) => format(date, DATE_TIME_FORMAT);

export const tableDateText = (date: Date) => format(date, TABLE_DATE_FORMAT);

export const numberText = (value: number) => NUMBER_FORMAT.format(value);

export const durationText = (seconds: number | null) => {
  if (seconds === null) return '00:00m';
  const whole = Math.round(seconds);
  return `${pad(Math.floor(whole / SECONDS_PER_MINUTE))}:${pad(whole % SECONDS_PER_MINUTE)}m`;
};

export const namedRefText = (ref: NamedRef | null) => {
  if (!ref) return EMPTY_VALUE;
  return `${ref.name} (${ref.id})`;
};

export const evaluatorText = (evaluator: { id: number | null; name: string }) => {
  if (evaluator.id === null) return evaluator.name;
  return `${evaluator.name} (${evaluator.id})`;
};

export const evaluationText = (run: {
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
}) => {
  if (run.evaluationStatus === null) return RunStatusLabel[run.status];
  return CallEvaluationStatusLabel[run.evaluationStatus];
};

export const passedRunsText = (success: number, total: number) => {
  if (total === 1) return `${success} of ${total} run passed`;
  return `${success} of ${total} runs passed`;
};

export const resultStateText = (counts: {
  failed: number;
  inProgress: number;
}) => {
  if (counts.inProgress > 0) return `${counts.inProgress} in progress`;
  if (counts.failed === 0) return 'No failures detected';
  if (counts.failed === 1) return '1 run failed';
  return `${counts.failed} runs failed`;
};
