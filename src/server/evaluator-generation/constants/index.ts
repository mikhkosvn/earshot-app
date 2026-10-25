export const GenerationScenarioType = {
  workflow: 'workflow',
  red_teaming: 'red_teaming',
} as const;

export type GenerationScenarioType =
  (typeof GenerationScenarioType)[keyof typeof GenerationScenarioType];

export const GenerationScenarioTypeLabel: Record<
  GenerationScenarioType,
  string
> = {
  [GenerationScenarioType.workflow]: 'Workflow',
  [GenerationScenarioType.red_teaming]: 'Red Teaming',
};

export const AssistantStatus = {
  needs_clarification: 'needs_clarification',
  completed: 'completed',
} as const;

export type AssistantStatus =
  (typeof AssistantStatus)[keyof typeof AssistantStatus];

export const AssistantMode = {
  clarify: 'clarify',
} as const;

export type AssistantMode = (typeof AssistantMode)[keyof typeof AssistantMode];

export const GenerationStepText = {
  starting: 'Starting generation...',
  generating: 'Generating scenarios...',
  complete: 'Generation complete',
} as const;

export const ASSISTANT_THINKING_STEP = 'Reading the agent description...';

export const GENERATION_MIN_SCENARIOS = 1;

export const GENERATION_MAX_SCENARIOS = 10;

export const NUM_SCENARIO_OPTIONS = [1, 2, 3, 5, 10] as const;

export const SESSION_TITLE_LENGTH = 50;

export const SKIPPED_ANSWER = 'Skip';

export const AGENT_SPEAKS_FIRST_QUESTION =
  "Will your agent always speak first at the start of a call? (Reply 'yes' if your agent sends the first message, or 'no' if our testing agent should start the conversation)";

export const EXTRA_INSTRUCTIONS_MAX_LENGTH = 5000;
