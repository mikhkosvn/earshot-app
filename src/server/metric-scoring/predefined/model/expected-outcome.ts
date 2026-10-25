import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { transcriptJson } from '@/server/metric-scoring/context/template-data';
import { askJudge } from '@/server/metric-scoring/judge/ask-judge';
import { excerpt } from '@/server/metric-scoring/judge/judge-mock';
import type { ScoringContext } from '@/server/metric-scoring/types';
import { completed, skipped } from '@/server/metric-scoring/utils/outcome';
import { stableRandom } from '@/server/metric-scoring/utils/stable-random';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';

const PASS_SHARE = 0.85;
const MAX_OUTCOME_PARTS = 3;

const outcomeParts = (expectedOutcome: string) =>
  expectedOutcome
    .split(/(?<=[.!?])\s+|\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, MAX_OUTCOME_PARTS);

const outcomeScore = (passed: boolean) => {
  if (passed) return RATING_SCALE_MAX;
  return 0;
};

const expectedOutcomeMock = (
  context: ScoringContext,
  expectedOutcome: string,
) => {
  const passed =
    stableRandom(context.metric.id, context.conversation.id) < PASS_SHARE;
  const mainTurns = context.conversation.turns.filter(
    (turn) => turn.role === TranscriptRole.main_agent,
  );
  const lines = outcomeParts(expectedOutcome).map((part, index) => {
    const turn = mainTurns[Math.min(index, mainTurns.length - 1)];
    if (!turn) return `❌ ${part} The main agent did not speak.`;
    const where = `${transcriptTime(turn.startTime)} with '${excerpt(turn.content)}'`;
    if (passed) return `✅ ${part} Met at ${where}`;
    return `❌ ${part} Not met at ${where}`;
  });
  return {
    result: outcomeScore(passed),
    explanation: lines,
  };
};

export const scoreExpectedOutcome = async (context: ScoringContext) => {
  const expectedOutcome = context.conversation.evaluator?.expectedOutcome;
  if (!expectedOutcome?.trim()) {
    return skipped(['This conversation has no expected outcome to check.']);
  }
  const judged = await askJudge({
    metric: context.metric,
    prompt: [
      `Expected outcome:\n${expectedOutcome}`,
      `Score ${RATING_SCALE_MAX} when every part of the expected outcome is met, 0 when it is not met. Write one point per part, starting with ✅ or ❌.`,
      `Transcript Json:\n${JSON.stringify(transcriptJson(context.conversation))}`,
    ].join('\n\n'),
    mock: () => expectedOutcomeMock(context, expectedOutcome),
  });
  if (judged.result === null) return skipped(judged.explanation);
  return completed(judged.result, judged.explanation);
};
