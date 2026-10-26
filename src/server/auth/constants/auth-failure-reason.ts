export const AuthFailureReason = {
  invalid_credentials: 'invalid_credentials',
  signup_closed: 'signup_closed',
} as const;

export type AuthFailureReason =
  (typeof AuthFailureReason)[keyof typeof AuthFailureReason];
