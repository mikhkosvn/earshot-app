export const AuthActionOperation = {
  signIn: 'auth.sign_in',
  signUp: 'auth.sign_up',
  signOut: 'auth.sign_out',
  isSignupOpen: 'auth.is_signup_open',
} as const;

export type AuthActionOperation =
  (typeof AuthActionOperation)[keyof typeof AuthActionOperation];
