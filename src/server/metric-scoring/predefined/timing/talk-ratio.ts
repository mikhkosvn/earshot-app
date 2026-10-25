import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import type { ScoringConversation } from '@/server/metric-scoring/types';
import { completed } from '@/server/metric-scoring/utils/outcome';
import { round2 } from '@/server/metric-scoring/utils/statistics';

const speakingSeconds = (
  conversation: ScoringConversation,
  role: TranscriptRole,
) =>
  conversation.turns
    .filter((turn) => turn.role === role)
    .reduce((sum, turn) => {
      if (turn.startTime === null || turn.endTime === null) return sum;
      return sum + Math.max(0, turn.endTime - turn.startTime);
    }, 0);

export const scoreTalkRatio = (conversation: ScoringConversation) => {
  const main = speakingSeconds(conversation, TranscriptRole.main_agent);
  const testing = speakingSeconds(conversation, TranscriptRole.testing_agent);
  if (main + testing === 0) {
    return completed(null, ['No timed speech exists in the transcript.']);
  }
  return completed(round2(main / (main + testing)), [
    `The main agent spoke ${round2(main)} seconds and the testing agent spoke ${round2(testing)} seconds.`,
  ]);
};
