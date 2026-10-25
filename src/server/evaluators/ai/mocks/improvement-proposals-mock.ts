import 'server-only';

import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';
import { improveTextMock } from '@/server/evaluators/ai/mocks/improve-text-mock';

export interface ImprovementSource {
  id: number;
  name: string;
  instructions: string;
  expectedOutcomePrompt: string;
}

interface MockProposal {
  evaluatorId: number;
  kind: EvaluatorTextKind;
  after: string;
  reason: string;
}

const DTMF_STEP =
  '- When the agent asks you to verify your identity, press the digits of {{test_profile.phone_number}} on the keypad.';

const STRICT_LINE =
  '- The Main Agent must not confirm any change before it verifies the caller name and phone number.';

const withDtmfStep = (instructions: string) => {
  if (!instructions.includes('</scenario>')) {
    return `${instructions}\n${DTMF_STEP}`;
  }
  return instructions.replace('</scenario>', `${DTMF_STEP}\n</scenario>`);
};

const addDtmfStep = (source: ImprovementSource): MockProposal => {
  return {
    evaluatorId: source.id,
    kind: EvaluatorTextKind.instructions,
    after: withDtmfStep(source.instructions),
    reason: 'The scenario now exercises keypad input during verification.',
  };
};

const makeStricter = (source: ImprovementSource): MockProposal => ({
  evaluatorId: source.id,
  kind: EvaluatorTextKind.expectedOutcome,
  after: [source.expectedOutcomePrompt.trim(), STRICT_LINE]
    .filter(Boolean)
    .join('\n'),
  reason: 'The outcome now fails when the agent skips identity verification.',
});

const fixOutcome = (source: ImprovementSource): MockProposal => ({
  evaluatorId: source.id,
  kind: EvaluatorTextKind.expectedOutcome,
  after: improveTextMock(
    EvaluatorTextKind.expectedOutcome,
    source.expectedOutcomePrompt ||
      `The Main Agent completes the request of the caller in "${source.name}".`,
  ),
  reason: 'Each expectation is now one concrete, checkable statement.',
});

const reviewOne = (source: ImprovementSource): MockProposal => ({
  evaluatorId: source.id,
  kind: EvaluatorTextKind.instructions,
  after: improveTextMock(EvaluatorTextKind.instructions, source.instructions),
  reason: 'The caller script is now in the second person with clear steps.',
});

const pickTransform = (prompt: string) => {
  const text = prompt.toLowerCase();
  if (text.includes('dtmf') || text.includes('keypad')) return addDtmfStep;
  if (text.includes('strict')) return makeStricter;
  if (text.includes('outcome')) return fixOutcome;
  return reviewOne;
};

const replyMessage = (prompt: string, sources: ImprovementSource[]) => {
  const missingOutcome = sources.filter(
    (source) => !source.expectedOutcomePrompt.trim(),
  ).length;
  const lines = [
    `I reviewed ${sources.length} evaluator(s) for the request: "${prompt}".`,
    `${missingOutcome} evaluator(s) have no expected outcome.`,
    'Review each proposed change below. Accept the changes that you want to keep.',
  ];
  return lines.join(' ');
};

export const improvementProposalsMock = (
  prompt: string,
  sources: ImprovementSource[],
) => {
  const transform = pickTransform(prompt);
  return {
    message: replyMessage(prompt, sources),
    proposals: sources.map(transform),
  };
};
