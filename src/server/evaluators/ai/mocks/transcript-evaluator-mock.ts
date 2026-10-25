import 'server-only';

import { TranscriptRole } from '@/server/call-engine/constants';
import type { TranscriptTurnInput } from '@/server/evaluators/types';

const NAME_WORD_LIMIT = 8;

const callerTurns = (turns: readonly TranscriptTurnInput[]) =>
  turns.filter((turn) => turn.role === TranscriptRole.testing_agent);

const agentTurns = (turns: readonly TranscriptTurnInput[]) =>
  turns.filter((turn) => turn.role === TranscriptRole.main_agent);

const shorten = (text: string) =>
  text.trim().split(/\s+/).slice(0, NAME_WORD_LIMIT).join(' ');

const firstMessageOf = (turns: readonly TranscriptTurnInput[]) => {
  const [first] = turns;
  if (first?.role !== TranscriptRole.testing_agent) return '';
  return first.content.trim();
};

const mockName = (turns: readonly TranscriptTurnInput[]) => {
  const [firstCaller] = callerTurns(turns);
  if (!firstCaller) return 'Transcript replay';
  return `Replay: ${shorten(firstCaller.content)}`;
};

export const transcriptEvaluatorMock = (
  turns: readonly TranscriptTurnInput[],
) => {
  const steps = callerTurns(turns).map(
    (turn) => `- Say: "${turn.content.trim()}"`,
  );
  const outcomes = agentTurns(turns)
    .slice(-3)
    .map(
      (turn) =>
        `- The Main Agent responds as in the call: "${turn.content.trim()}"`,
    );
  return {
    name: mockName(turns),
    firstMessage: firstMessageOf(turns),
    instructions: [
      '<scenario>',
      'You are the caller from a past call. Replay the call in your own words.',
      '',
      'Follow these steps in the conversation when required:',
      ...steps,
      '- End the call politely when the agent completes your request.',
      '</scenario>',
    ].join('\n'),
    expectedOutcomePrompt: [
      ...outcomes,
      '- The Main Agent resolves the request of the Testing Agent.',
    ].join('\n'),
  };
};
