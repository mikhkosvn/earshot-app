import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { REPETITION_SIMILARITY } from '@/server/metric-scoring/constants';
import type {
  ScoringConversation,
  ScoringTurn,
} from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';

const MIN_TOKENS = 4;

export const tokens = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const similarity = (left: Set<string>, right: Set<string>) => {
  const shared = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  if (union === 0) return 0;
  return shared / union;
};

const repeatedTurns = (conversation: ScoringConversation): ScoringTurn[] => {
  const mainTurns = conversation.turns.filter(
    (turn) => turn.role === TranscriptRole.main_agent,
  );
  const sets = mainTurns.map((turn) => new Set(tokens(turn.content)));
  return mainTurns.filter((turn, index) => {
    if (sets[index].size < MIN_TOKENS) return false;
    return sets
      .slice(0, index)
      .some(
        (earlier) => similarity(earlier, sets[index]) >= REPETITION_SIMILARITY,
      );
  });
};

const repetitionLines = (turns: ScoringTurn[]) =>
  turns.map(
    (turn) =>
      `The main agent repeated itself at ${transcriptTime(turn.startTime)}: "${turn.content}"`,
  );

export const scoreRepetitionCount = (conversation: ScoringConversation) => {
  const repeated = repeatedTurns(conversation);
  if (repeated.length === 0) {
    return completed(0, ['The main agent did not repeat itself.']);
  }
  return completed(repeated.length, repetitionLines(repeated));
};

export const scoreRepetitionScore = (conversation: ScoringConversation) => {
  const repeated = repeatedTurns(conversation);
  const score = Math.max(0, RATING_SCALE_MAX - repeated.length);
  if (repeated.length === 0) {
    return completed(score, ['The main agent did not repeat itself.']);
  }
  return completed(score, repetitionLines(repeated));
};
