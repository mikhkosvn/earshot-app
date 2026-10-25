export const RunChannel = {
  voice: 'voice',
} as const;

export type RunChannel = (typeof RunChannel)[keyof typeof RunChannel];

export const RunChannelLabel: Record<RunChannel, string> = {
  [RunChannel.voice]: 'Voice (phone call)',
};
