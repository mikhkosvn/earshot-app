export const ConnectionType = {
  telephony: 'telephony',
  provider: 'provider',
} as const;

export type ConnectionType =
  (typeof ConnectionType)[keyof typeof ConnectionType];

export const CONNECTION_TYPE_LABEL: Record<ConnectionType, string> = {
  [ConnectionType.telephony]: 'Phone',
  [ConnectionType.provider]: 'Provider',
};

export const CONNECTION_CHECK_FAILED_MESSAGE =
  'At least one configuration method must be provided: contact_number, or assistant_provider (with required fields: assistant_id + api_key for vapi/retell/elevenlabs).';

export const PROVIDER_CONNECTION_BLOCKED_REASON =
  'A test call needs a phone number. Add one under Telephony Settings.';
