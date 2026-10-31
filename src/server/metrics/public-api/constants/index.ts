export const PublicAlertType = {
  disabled: 'disabled',
} as const;

export type PublicAlertType =
  (typeof PublicAlertType)[keyof typeof PublicAlertType];

export const BINARY_EVAL_TYPE_PREFIX = 'binary';

export const REQUIRED_FIELD_MESSAGE = 'This field is required.';

export const UNKNOWN_EVAL_TYPE_MESSAGE =
  'Send binary, continuous_qualitative, numeric, or enum.';
