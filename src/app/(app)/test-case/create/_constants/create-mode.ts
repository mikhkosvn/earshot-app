export const CreateMode = {
  ai: 'ai',
  manual: 'manual',
  transcript: 'transcript',
} as const;

export type CreateMode = (typeof CreateMode)[keyof typeof CreateMode];

export const CreateModeLabel: Record<CreateMode, string> = {
  [CreateMode.ai]: 'AI Mode',
  [CreateMode.manual]: 'Manual Mode',
  [CreateMode.transcript]: 'Transcript Mode',
};

export const ManualStep = {
  scenarioInput: 0,
  basics: 1,
  criteria: 2,
  configuration: 3,
} as const;

export type ManualStep = (typeof ManualStep)[keyof typeof ManualStep];

export const MANUAL_STEP_LABELS = [
  'Scenario Input',
  'Basics',
  'Criteria',
  'Configuration',
] as const;

export const AI_SUGGESTIONS = [
  {
    title: 'Caller disputes a charge',
    prompt:
      'The caller disputes a charge on the last bill and asks for a refund. The agent must verify the account before it explains the charge.',
  },
  {
    title: 'Caller demands a human',
    prompt:
      'The caller is frustrated and demands to speak to a human right away. The agent must try to help first and then offer a transfer.',
  },
  {
    title: 'Caller reschedules twice',
    prompt:
      'The caller reschedules an appointment, then changes the new date again before the call ends. The agent must confirm the final date.',
  },
] as const;

export const AI_SCENARIO_COUNT_OPTIONS = [1, 2, 3, 5, 10] as const;
