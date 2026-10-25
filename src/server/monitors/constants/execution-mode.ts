export const ExecutionMode = {
  voice: 'voice',
} as const;

export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode];

export const ExecutionModeLabel: Record<ExecutionMode, string> = {
  [ExecutionMode.voice]: 'Voice',
};
