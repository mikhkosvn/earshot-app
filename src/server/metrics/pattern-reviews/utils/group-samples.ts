import 'server-only';

import { z } from 'zod';

import { TranscriptRole } from '@/generated/prisma/enums';
import { generateObject } from '@/server/ai/generate-object';
import { PATTERN_REVIEW_EVIDENCE_LINES } from '@/server/metrics/constants/pattern-review/pattern-review-limits';
import type { MetricValue } from '@/server/metrics/types';

export interface ReviewSample {
  conversationId: number;
  verdict: MetricValue;
  skipped: boolean;
  error: string | null;
  explanation: string[];
  turns: { role: TranscriptRole; content: string; startTime: number | null }[];
}

const groupsSchema = z.object({
  groups: z.array(
    z.object({
      label: z.string(),
      summary: z.string(),
      conversationIds: z.array(z.number().int()),
      representativeId: z.number().int(),
      evidence: z.array(
        z.object({
          speaker: z.enum(TranscriptRole),
          timeSeconds: z.number().nullable(),
          text: z.string(),
          isKey: z.boolean(),
        }),
      ),
    }),
  ),
});

export type SampleGroup = z.output<typeof groupsSchema>['groups'][number];

const SYSTEM_PROMPT = [
  'You group the results of one evaluation metric across several voice calls.',
  'Put calls with the same reason for their verdict in one group.',
  'Give each group a short label and a one-sentence summary.',
  'Pick one representative call per group and up to three evidence lines from its transcript.',
  'Mark the evidence line that decided the verdict with isKey true.',
].join('\n');

const bucketKey = (sample: ReviewSample) => {
  if (sample.error) return 'error';
  if (sample.skipped || sample.verdict === null) return 'skipped';
  return JSON.stringify(sample.verdict);
};

const describeBucket = (key: string, metricName: string) => {
  if (key === 'error') {
    return {
      label: 'The metric could not score these calls',
      summary: `The "${metricName}" metric returned an error on these calls, so no verdict exists.`,
    };
  }
  if (key === 'skipped') {
    return {
      label: 'The situation for this metric did not arise',
      summary: `The conversation gave no chance to apply "${metricName}", so the judge returned N/A.`,
    };
  }
  if (key === 'true') {
    return {
      label: 'Main Agent meets the metric criteria',
      summary: `The main agent showed the behavior that "${metricName}" expects at the moment it mattered.`,
    };
  }
  if (key === 'false') {
    return {
      label: 'Main Agent misses the metric criteria',
      summary: `The situation arose, and the main agent did not show the behavior that "${metricName}" expects.`,
    };
  }
  const scored: unknown = JSON.parse(key);
  return {
    label: `Calls scored ${String(scored)}`,
    summary: `The judge gave these calls the same "${metricName}" result for similar reasons.`,
  };
};

const evidenceOf = (sample: ReviewSample): SampleGroup['evidence'] => {
  const firstCaller = sample.turns.find(
    (turn) => turn.role === TranscriptRole.testing_agent,
  );
  const keyTurn = sample.turns.find(
    (turn) =>
      turn.role === TranscriptRole.main_agent &&
      (turn.startTime ?? 0) >= (firstCaller?.startTime ?? 0),
  );
  const lastCaller = sample.turns.findLast(
    (turn) =>
      turn.role === TranscriptRole.testing_agent && turn !== firstCaller,
  );
  return [firstCaller, keyTurn, lastCaller]
    .filter((turn) => turn !== undefined)
    .slice(0, PATTERN_REVIEW_EVIDENCE_LINES)
    .map((turn) => ({
      speaker: turn.role,
      timeSeconds: turn.startTime,
      text: turn.content,
      isKey: turn === keyTurn,
    }));
};

export const groupSamplesMock = (
  samples: ReviewSample[],
  metricName: string,
): SampleGroup[] => {
  const buckets = new Map<string, ReviewSample[]>();
  for (const sample of samples) {
    const key = bucketKey(sample);
    buckets.set(key, [...(buckets.get(key) ?? []), sample]);
  }
  return [...buckets.entries()]
    .toSorted((left, right) => right[1].length - left[1].length)
    .map(([key, members]) => ({
      ...describeBucket(key, metricName),
      conversationIds: members.map((member) => member.conversationId),
      representativeId: members[0].conversationId,
      evidence: evidenceOf(members[0]),
    }));
};

const MAX_PROMPT_TURNS = 12;

const samplePrompt = (sample: ReviewSample) =>
  [
    `Call ${sample.conversationId}: verdict ${JSON.stringify(sample.verdict)}`,
    `Explanation: ${sample.explanation.join(' ')}`,
    ...sample.turns
      .slice(0, MAX_PROMPT_TURNS)
      .map((turn) => `[${turn.startTime ?? 0}s] ${turn.role}: ${turn.content}`),
  ].join('\n');

export const groupSamples = async (
  samples: ReviewSample[],
  metricName: string,
): Promise<SampleGroup[]> => {
  const { groups } = await generateObject({
    system: SYSTEM_PROMPT,
    prompt: `Metric: ${metricName}\n\n${samples.map(samplePrompt).join('\n\n')}`,
    schema: groupsSchema,
    mock: () => ({ groups: groupSamplesMock(samples, metricName) }),
  });
  const known = new Set(samples.map((sample) => sample.conversationId));
  return groups
    .map((group) => ({
      ...group,
      conversationIds: group.conversationIds.filter((id) => known.has(id)),
    }))
    .filter((group) => group.conversationIds.length > 0);
};
