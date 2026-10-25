import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { SampleSource } from '@/server/metrics/constants/pattern-review/sample-source';
import type {
  MetricValue,
  PatternGroupView,
  PatternReviewCounts,
  PatternReviewView,
  PatternSampleView,
} from '@/server/metrics/types';

const byPosition = { orderBy: { position: Prisma.SortOrder.asc } };

export const patternReviewSelect = {
  id: true,
  status: true,
  stage: true,
  insufficientHistory: true,
  error: true,
  rebuiltAt: true,
  createdAt: true,
  updatedAt: true,
  metric: {
    select: {
      id: true,
      name: true,
      type: true,
      evalType: true,
      description: true,
      customCode: true,
      enumOptions: { select: { value: true }, ...byPosition },
    },
  },
  groups: {
    ...byPosition,
    select: {
      key: true,
      label: true,
      summary: true,
      verdictNumber: true,
      verdictBoolean: true,
      verdictText: true,
      inconsistent: true,
      representativeSampleId: true,
      correctionNumber: true,
      correctionBoolean: true,
      correctionText: true,
      correctionNote: true,
      correctedAt: true,
      evidence: {
        ...byPosition,
        select: { speaker: true, timeSeconds: true, text: true, isKey: true },
      },
      samples: {
        orderBy: { id: Prisma.SortOrder.asc },
        select: {
          id: true,
          conversationId: true,
          verdictNumber: true,
          verdictBoolean: true,
          verdictText: true,
          skipped: true,
          error: true,
          explanation: true,
          conversation: {
            select: {
              endedReason: true,
              run: { select: { id: true } },
              callLog: { select: { id: true } },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.MetricPatternReviewSelect;

type ReviewRow = Prisma.MetricPatternReviewGetPayload<{
  select: typeof patternReviewSelect;
}>;
type GroupRow = ReviewRow['groups'][number];
type SampleRow = GroupRow['samples'][number];

const SECONDS_PER_MINUTE = 60;

export const clockTime = (seconds: number | null) => {
  if (seconds === null) return '';
  const whole = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(whole / SECONDS_PER_MINUTE)).padStart(
    2,
    '0',
  );
  const rest = String(whole % SECONDS_PER_MINUTE).padStart(2, '0');
  return `${minutes}:${rest}`;
};

const sampleSource = (sample: SampleRow) => {
  if (sample.conversation.run) {
    return { source: SampleSource.run, sourceId: sample.conversation.run.id };
  }
  if (sample.conversation.callLog) {
    return {
      source: SampleSource.call_log,
      sourceId: sample.conversation.callLog.id,
    };
  }
  return { source: SampleSource.conversation, sourceId: sample.conversationId };
};

const toSampleView = (sample: SampleRow): PatternSampleView => {
  const { source, sourceId } = sampleSource(sample);
  return {
    conversationId: sample.conversationId,
    source,
    sourceId,
    label: `${source.replace('_', '-')}-${sourceId}`,
    verdict: valueFromParts({
      number: sample.verdictNumber,
      boolean: sample.verdictBoolean,
      text: sample.verdictText,
    }),
    skipped: sample.skipped,
    error: sample.error,
    explanation: sample.explanation,
    callEndReason: sample.conversation.endedReason,
  };
};

const correctionOf = (group: GroupRow) => {
  if (!group.correctedAt) return null;
  return {
    value: valueFromParts({
      number: group.correctionNumber,
      boolean: group.correctionBoolean,
      text: group.correctionText,
    }),
    note: group.correctionNote ?? '',
  };
};

const optionalSampleView = (sample: SampleRow | undefined) => {
  if (!sample) return null;
  return toSampleView(sample);
};

const groupSamples = (group: PatternGroupView) => {
  if (!group.representative) return group.others;
  return [group.representative, ...group.others];
};

const toGroupView = (group: GroupRow): PatternGroupView => {
  const representative = group.samples.find(
    (sample) => sample.id === group.representativeSampleId,
  );
  return {
    key: group.key,
    label: group.label,
    summary: group.summary,
    verdict: valueFromParts({
      number: group.verdictNumber,
      boolean: group.verdictBoolean,
      text: group.verdictText,
    }),
    inconsistent: group.inconsistent,
    size: group.samples.length,
    evidence: group.evidence.map((line) => ({
      speaker: line.speaker,
      time: clockTime(line.timeSeconds),
      text: line.text,
      isKey: line.isKey,
    })),
    representative: optionalSampleView(representative),
    others: group.samples
      .filter((sample) => sample.id !== group.representativeSampleId)
      .map(toSampleView),
    correction: correctionOf(group),
  };
};

const isPass = (value: MetricValue) => value === true;
const isFail = (value: MetricValue) => value === false;

const countsOf = (groups: PatternGroupView[]): PatternReviewCounts => {
  const samples = groups.flatMap(groupSamples);
  const skipped = samples.filter((sample) => sample.skipped).length;
  const errors = samples.filter((sample) => sample.error).length;
  return {
    total: samples.length,
    evaluated: samples.length - skipped - errors,
    pass: samples.filter((sample) => isPass(sample.verdict)).length,
    fail: samples.filter((sample) => isFail(sample.verdict)).length,
    skipped,
    error: errors,
  };
};

export const toPatternReviewView = (row: ReviewRow): PatternReviewView => {
  const groups = row.groups.map(toGroupView);
  return {
    id: row.id,
    status: row.status,
    stage: row.stage,
    insufficientHistory: row.insufficientHistory,
    error: row.error,
    metric: {
      id: row.metric.id,
      name: row.metric.name,
      type: row.metric.type,
      evalType: row.metric.evalType,
      description: row.metric.description,
      customCode: row.metric.customCode,
      enumValues: row.metric.enumOptions.map((option) => option.value),
    },
    counts: countsOf(groups),
    groups,
    rebuiltAt: row.rebuiltAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
};
