export const MetadataKey = {
  endedReason: 'ended_reason',
  callEndedAt: 'call_ended_at',
  callCreatedAt: 'call_created_at',
  callStartedAt: 'call_started_at',
  ringingDuration: 'ringing_duration',
  providerCallData: 'provider_call_data',
  dynamicVariables: 'dynamic_variables',
} as const;

export type MetadataKey = (typeof MetadataKey)[keyof typeof MetadataKey];
