import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { SPEAKING_RATE_CHANGE_RATIO } from '@/server/metric-scoring/constants';
import { tokens } from '@/server/metric-scoring/predefined/text/repetition';
import type { ScoringConversation } from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import { median, round2 } from '@/server/metric-scoring/utils/statistics';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';

const SECONDS_PER_MINUTE = 60;
const MIN_TURN_WORDS = 4;

const mainTurnRates = (conversation: ScoringConversation) =>
  conversation.turns.flatMap((turn) => {
    if (turn.role !== TranscriptRole.main_agent) return [];
    if (turn.startTime === null || turn.endTime === null) return [];
    const seconds = turn.endTime - turn.startTime;
    const words = tokens(turn.content).length;
    if (seconds <= 0 || words === 0) return [];
    return [{ startTime: turn.startTime, seconds, words }];
  });

export const scoreWordsPerMinute = (conversation: ScoringConversation) => {
  const rates = mainTurnRates(conversation);
  const seconds = rates.reduce((sum, rate) => sum + rate.seconds, 0);
  const words = rates.reduce((sum, rate) => sum + rate.words, 0);
  if (seconds === 0) {
    return completed(null, ['The main agent has no timed speech.']);
  }
  const wpm = round2((words / seconds) * SECONDS_PER_MINUTE);
  return completed(wpm, [
    `The main agent spoke ${words} words in ${round2(seconds)} seconds (${wpm} words per minute).`,
  ]);
};

export const scoreSpeakingRateChange = (conversation: ScoringConversation) => {
  const rates = mainTurnRates(conversation)
    .filter((rate) => rate.words >= MIN_TURN_WORDS)
    .map((rate) => ({
      ...rate,
      wpm: (rate.words / rate.seconds) * SECONDS_PER_MINUTE,
    }));
  const typical = median(rates.map((rate) => rate.wpm));
  if (typical === null) {
    return completed(true, ['The main agent turns are too short to compare.']);
  }
  const abrupt = rates.find(
    (rate) =>
      Math.abs(rate.wpm - typical) > typical * SPEAKING_RATE_CHANGE_RATIO,
  );
  if (abrupt) {
    return completed(false, [
      `The main agent speaking rate changed abruptly at ${transcriptTime(abrupt.startTime)}: ${round2(abrupt.wpm)} against a typical ${round2(typical)} words per minute.`,
    ]);
  }
  return completed(true, [
    `The main agent kept a steady rate near ${round2(typical)} words per minute.`,
  ]);
};
