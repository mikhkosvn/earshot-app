import 'server-only';

import { MetricEvalType, TranscriptRole } from '@/generated/prisma/enums';
import { tokens } from '@/server/metric-scoring/predefined/text/repetition';
import type {
  ScoringConversation,
  ScoringMetric,
  ScoringTurn,
} from '@/server/metric-scoring/types';
import { stableRandom } from '@/server/metric-scoring/utils/stable-random';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';
import type { MetricValue } from '@/server/metrics/types';

const PASS_SHARE = 0.75;
const RATING_FLOOR = 3;
const RATING_SPAN = 2;
const HALF_STEPS = 2;
const EXCERPT_LENGTH = 90;
const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'if',
  'to',
  'of',
  'in',
  'on',
  'for',
  'is',
  'it',
  'this',
  'that',
  'metric',
  'main',
  'agent',
  'testing',
  'with',
  'be',
  'by',
  'are',
  'was',
  'not',
  'does',
  'when',
  'call',
  'fails',
  'passes',
]);

export interface JudgeResult {
  result: MetricValue;
  explanation: string[];
}

const keywords = (text: string) =>
  new Set(tokens(text).filter((token) => !STOP_WORDS.has(token)));

const overlap = (turn: ScoringTurn, words: Set<string>) =>
  tokens(turn.content).filter((token) => words.has(token)).length;

export const keywordOverlap = (
  conversation: ScoringConversation,
  text: string,
) => {
  const words = keywords(text);
  return conversation.turns.reduce(
    (sum, turn) => sum + overlap(turn, words),
    0,
  );
};

export const bestMatchingTurn = (
  conversation: ScoringConversation,
  text: string,
): ScoringTurn | null => {
  const words = keywords(text);
  const mainTurns = conversation.turns.filter(
    (turn) => turn.role === TranscriptRole.main_agent,
  );
  const ranked = mainTurns.toSorted(
    (left, right) => overlap(right, words) - overlap(left, words),
  );
  return ranked[0] ?? null;
};

export const excerpt = (text: string) => {
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, EXCERPT_LENGTH)}...`;
};

const citation = (turn: ScoringTurn, passed: boolean) => {
  const where = `${transcriptTime(turn.startTime)} with '${excerpt(turn.content)}'`;
  if (passed) return `✅ Main Agent meets the criteria at ${where}`;
  return `❌ Main Agent misses the criteria at ${where}`;
};

const ratingValue = (random: number) =>
  Math.round((RATING_FLOOR + random * RATING_SPAN) * HALF_STEPS) / HALF_STEPS;

const enumValue = (
  conversation: ScoringConversation,
  values: string[],
  random: number,
) => {
  const text = conversation.turns
    .map((turn) => turn.content)
    .join(' ')
    .toLowerCase();
  return (
    values.find((value) => text.includes(value.toLowerCase())) ??
    values[Math.floor(random * values.length)] ??
    null
  );
};

const mockValue = (
  conversation: ScoringConversation,
  metric: ScoringMetric,
  random: number,
): MetricValue => {
  if (metric.evalType === MetricEvalType.binary) return random < PASS_SHARE;
  if (metric.evalType === MetricEvalType.continuous_qualitative) {
    return ratingValue(random);
  }
  if (metric.evalType === MetricEvalType.enum) {
    return enumValue(conversation, metric.enumValues, random);
  }
  return conversation.turns.filter(
    (turn) => turn.role === TranscriptRole.main_agent,
  ).length;
};

export const judgeMock = (
  conversation: ScoringConversation,
  metric: ScoringMetric,
  text: string,
): JudgeResult => {
  const turn = bestMatchingTurn(conversation, text);
  if (!turn) {
    return {
      result: null,
      explanation: ['The transcript has no Main Agent turn to judge.'],
    };
  }
  const random = stableRandom(metric.id, conversation.id, text.length);
  return {
    result: mockValue(conversation, metric, random),
    explanation: [
      citation(turn, random < PASS_SHARE),
      `The judge read ${conversation.turns.length} turns of the conversation.`,
    ],
  };
};
