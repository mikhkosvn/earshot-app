import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { LATENCY_SEARCH_SECONDS } from '@/server/metric-scoring/constants';
import { speechOnset } from '@/server/metric-scoring/predefined/audio/frames';
import type { ScoringConversation } from '@/server/metric-scoring/types';
import { round2 } from '@/server/metric-scoring/utils/statistics';

export type TurnLatency = {
  latencyMs: number;
  startTime: number;
};

const MS_PER_SECOND = 1000;

const responseStart = (
  conversation: ScoringConversation,
  callerEnd: number,
  transcriptStart: number,
) => {
  if (!conversation.recording) return transcriptStart;
  const onset = speechOnset(
    conversation.recording,
    conversation.mainChannelIndex,
    callerEnd,
    transcriptStart + LATENCY_SEARCH_SECONDS,
  );
  if (onset === null) return transcriptStart;
  return onset;
};

export const turnLatencies = (
  conversation: ScoringConversation,
): TurnLatency[] =>
  conversation.turns.flatMap((turn, index) => {
    const previous = conversation.turns[index - 1];
    if (turn.role !== TranscriptRole.main_agent) return [];
    if (previous?.role !== TranscriptRole.testing_agent) return [];
    if (previous.endTime === null || turn.startTime === null) return [];
    const start = responseStart(conversation, previous.endTime, turn.startTime);
    const latencyMs = round2((start - previous.endTime) * MS_PER_SECOND);
    if (latencyMs < 0) return [];
    return [{ latencyMs, startTime: round2(turn.startTime) }];
  });
