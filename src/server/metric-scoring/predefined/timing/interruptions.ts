import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { INTERRUPTION_OVERLAP_SECONDS } from '@/server/metric-scoring/constants';
import { speechOffset } from '@/server/metric-scoring/predefined/audio/frames';
import type {
  ScoringConversation,
  ScoringTurn,
} from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import { mean, round2 } from '@/server/metric-scoring/utils/statistics';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';

type Interruption = {
  interrupted: ScoringTurn;
  interrupter: ScoringTurn;
  at: number;
};

const MS_PER_SECOND = 1000;
const STOP_SEARCH_SECONDS = 3;

const interruptionsBy = (
  conversation: ScoringConversation,
  interrupterRole: TranscriptRole,
): Interruption[] =>
  conversation.turns.flatMap((turn, index) => {
    const previous = conversation.turns[index - 1];
    if (!previous || turn.role !== interrupterRole) return [];
    if (previous.role === interrupterRole) return [];
    if (turn.startTime === null || previous.endTime === null) return [];
    if (previous.endTime - turn.startTime <= INTERRUPTION_OVERLAP_SECONDS) {
      return [];
    }
    return [{ interrupted: previous, interrupter: turn, at: turn.startTime }];
  });

export const scoreMainAgentInterruptions = (
  conversation: ScoringConversation,
) => {
  const found = interruptionsBy(conversation, TranscriptRole.main_agent);
  if (found.length === 0) {
    return completed(0, ["Main agent didn't interrupt the testing agent"]);
  }
  return completed(
    found.length,
    found.map(
      (item) =>
        `Main agent interrupted the testing agent at ${transcriptTime(item.at)}`,
    ),
  );
};

export const scoreTestingAgentInterruptions = (
  conversation: ScoringConversation,
) => {
  const found = interruptionsBy(conversation, TranscriptRole.testing_agent);
  if (found.length === 0) {
    return completed(0, ["Testing agent didn't interrupt the main agent"]);
  }
  return completed(
    found.length,
    found.map(
      (item) =>
        `Testing agent interrupted the main agent at ${transcriptTime(item.at)}`,
    ),
  );
};

export const scoreInterruptionScore = (conversation: ScoringConversation) => {
  const found = interruptionsBy(conversation, TranscriptRole.main_agent);
  const score = Math.max(0, RATING_SCALE_MAX - found.length);
  if (found.length === 0) {
    return completed(score, [
      'The main agent did not interrupt the testing agent at any point.',
    ]);
  }
  return completed(score, [
    `The main agent interrupted the testing agent ${found.length} time(s).`,
    ...found.map((item) => `Interruption at ${transcriptTime(item.at)}`),
  ]);
};

const stopSeconds = (conversation: ScoringConversation, item: Interruption) => {
  const transcriptEnd = item.interrupted.endTime ?? item.at;
  if (!conversation.recording) return transcriptEnd - item.at;
  const offset = speechOffset(
    conversation.recording,
    conversation.mainChannelIndex,
    item.at,
    transcriptEnd + STOP_SEARCH_SECONDS,
  );
  if (offset === null) return transcriptEnd - item.at;
  return Math.max(0, offset - item.at);
};

export const scoreStopTimeAfterInterruption = (
  conversation: ScoringConversation,
) => {
  const found = interruptionsBy(conversation, TranscriptRole.testing_agent);
  if (found.length === 0) {
    return completed(null, [
      'The testing agent did not interrupt the main agent, so no stop time exists.',
    ]);
  }
  const values = found.map((item) =>
    round2(stopSeconds(conversation, item) * MS_PER_SECOND),
  );
  return completed(
    round2(mean(values) ?? 0),
    found.map(
      (item, index) =>
        `The main agent stopped ${values[index]}ms after the interruption at ${transcriptTime(item.at)}`,
    ),
    { values },
  );
};
