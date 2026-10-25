import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import {
  DEFAULT_INFRA_TIMEOUT_SECONDS,
  DEFAULT_SILENCE_SECONDS,
} from '@/server/metric-scoring/constants';
import type {
  ScoringConversation,
  ScoringMetric,
} from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import { round2 } from '@/server/metric-scoring/utils/statistics';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';

type Gap = { from: number; seconds: number };

const timedTurns = (conversation: ScoringConversation) =>
  conversation.turns
    .flatMap((turn) => {
      if (turn.startTime === null || turn.endTime === null) return [];
      return [{ role: turn.role, start: turn.startTime, end: turn.endTime }];
    })
    .toSorted((left, right) => left.start - right.start);

const longestSharedGap = (conversation: ScoringConversation): Gap | null => {
  let speechEnd: number | null = null;
  let longest: Gap | null = null;
  for (const turn of timedTurns(conversation)) {
    if (speechEnd !== null && turn.start > speechEnd) {
      const seconds = turn.start - speechEnd;
      if (!longest || seconds > longest.seconds) {
        longest = { from: speechEnd, seconds };
      }
    }
    speechEnd = Math.max(speechEnd ?? turn.end, turn.end);
  }
  return longest;
};

const configured = (metric: ScoringMetric, key: string, fallback: number) =>
  metric.configuration?.[key] ?? fallback;

export const scoreSilence = (
  conversation: ScoringConversation,
  metric: ScoringMetric,
) => {
  const limit = configured(metric, 'silence_duration', DEFAULT_SILENCE_SECONDS);
  const gap = longestSharedGap(conversation);
  if (!gap || gap.seconds <= limit) {
    return completed(true, [
      `Neither agent was silent for more than ${limit} seconds.`,
    ]);
  }
  return completed(false, [
    `Neither agent spoke for ${round2(gap.seconds)} seconds from ${transcriptTime(gap.from)}.`,
  ]);
};

const mainAgentWaits = (conversation: ScoringConversation): Gap[] => {
  const turns = timedTurns(conversation);
  return turns.flatMap((turn, index) => {
    if (turn.role !== TranscriptRole.testing_agent) return [];
    const next = turns
      .slice(index + 1)
      .find((candidate) => candidate.role === TranscriptRole.main_agent);
    const answerAt = next?.start ?? conversation.durationSeconds;
    return [{ from: turn.end, seconds: Math.max(0, answerAt - turn.end) }];
  });
};

export const scoreInfrastructureIssues = (
  conversation: ScoringConversation,
  metric: ScoringMetric,
) => {
  const limit = configured(
    metric,
    'infra_issues_timeout',
    DEFAULT_INFRA_TIMEOUT_SECONDS,
  );
  const mainSpoke = conversation.turns.some(
    (turn) => turn.role === TranscriptRole.main_agent,
  );
  if (!mainSpoke) {
    return completed(false, ['The main agent did not speak during the call.']);
  }
  const longWait = mainAgentWaits(conversation).find(
    (wait) => wait.seconds > limit,
  );
  if (longWait) {
    return completed(false, [
      `The main agent did not speak for ${round2(longWait.seconds)} seconds after ${transcriptTime(longWait.from)}.`,
    ]);
  }
  return completed(true, [
    `The main agent answered every turn within ${limit} seconds.`,
  ]);
};
