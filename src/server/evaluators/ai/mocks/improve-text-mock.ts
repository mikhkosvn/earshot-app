import 'server-only';

import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';

const SCENARIO_TAG_PATTERN = /<\/?scenario>/g;
const SENTENCE_PATTERN = /(?<=[.!?])\s+|\n+/;

const toLines = (text: string) =>
  text
    .replace(SCENARIO_TAG_PATTERN, '')
    .split(SENTENCE_PATTERN)
    .map((line) => line.replace(/^[-*\d.)\s]+/, '').trim())
    .filter(Boolean);

const firstPersonLine = (line: string) => {
  if (/^you are/i.test(line)) return line;
  return `You are a caller. ${line}`;
};

const improveInstructions = (text: string) => {
  const [first = 'You are a caller.', ...rest] = toLines(text);
  const steps = rest.map((line) => `- ${line}`);
  return [
    '<scenario>',
    firstPersonLine(first),
    '',
    'Follow these steps in the conversation when required:',
    ...steps,
    '- Answer each question of the agent with the details from your information block.',
    '- End the call politely when the agent completes your request.',
    '</scenario>',
  ].join('\n');
};

const mainAgentLine = (line: string) => {
  if (/main agent/i.test(line)) return `- ${line}`;
  return `- The Main Agent ${line.charAt(0).toLowerCase()}${line.slice(1)}`;
};

const improveExpectedOutcome = (text: string) => {
  const lines = toLines(text).map(mainAgentLine);
  const closing = '- The Main Agent confirms the outcome before the call ends.';
  if (lines.some((line) => /confirm/i.test(line))) return lines.join('\n');
  return [...lines, closing].join('\n');
};

export const improveTextMock = (kind: EvaluatorTextKind, text: string) => {
  if (kind === EvaluatorTextKind.expectedOutcome) {
    return improveExpectedOutcome(text);
  }
  return improveInstructions(text);
};
