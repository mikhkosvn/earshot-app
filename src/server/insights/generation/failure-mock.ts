import 'server-only';

import type { FailureItem } from '@/server/insights/generation/load-failures';

export interface MockFailureMode {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const MOCK_FAILURE_MODES: MockFailureMode[] = [
  {
    slug: 'repeats-information',
    name: 'Repeats information',
    description:
      'The agent repeats a question or a statement after the caller already answered it.',
    keywords: ['repeat', 'again', 'same question', 'already', 'redundant'],
  },
  {
    slug: 'talks-over-caller',
    name: 'Talks over the caller',
    description:
      'The agent starts to speak before the caller finishes, so the caller must say it again.',
    keywords: ['interrupt', 'talks over', 'cut off', 'overlap'],
  },
  {
    slug: 'slow-responses',
    name: 'Slow responses',
    description:
      'Long pauses before the agent answers make the caller wait or hang up.',
    keywords: ['latency', 'slow', 'pause', 'silence', 'delay', 'wait'],
  },
  {
    slug: 'skips-confirmation',
    name: 'Skips confirmation',
    description:
      'The agent books, changes, or cancels something without a clear yes from the caller.',
    keywords: ['confirm', 'book', 'cancel', 'reschedul', 'appointment'],
  },
  {
    slug: 'wrong-information',
    name: 'Gives wrong information',
    description:
      'The agent states facts that do not match the caller request or the business data.',
    keywords: [
      'wrong',
      'incorrect',
      'fabricat',
      'invent',
      'price',
      'not available',
    ],
  },
  {
    slug: 'missed-escalation',
    name: 'Missed escalation',
    description:
      'The caller asks for a person or the issue needs a transfer, but the agent keeps the call.',
    keywords: [
      'human',
      'transfer',
      'escalat',
      'manager',
      'representative',
      'agent please',
    ],
  },
  {
    slug: 'incomplete-resolution',
    name: 'Incomplete resolution',
    description: 'The call ends before the goal of the caller is reached.',
    keywords: [],
  },
];

const FALLBACK_MODE = MOCK_FAILURE_MODES[MOCK_FAILURE_MODES.length - 1];

export const mockModeOf = (failure: FailureItem) => {
  const text = `${failure.explanation} ${failure.excerpt}`.toLowerCase();
  return (
    MOCK_FAILURE_MODES.find((mode) =>
      mode.keywords.some((keyword) => text.includes(keyword)),
    ) ?? FALLBACK_MODE
  );
};

export const mockAssignmentText = (
  failure: FailureItem,
  mode: MockFailureMode,
) => {
  if (failure.explanation) {
    return `${mode.name}: ${failure.explanation}`;
  }
  return `${mode.name}. The metric value was ${failure.value}.`;
};
