export const AuthKey = {
  signIn: 'sign-in',
  signUp: 'sign-up',
} as const;

export type AuthKey = (typeof AuthKey)[keyof typeof AuthKey];

export class AuthService {
  static readonly signInMutationKey = [AuthKey.signIn];
  static readonly signUpMutationKey = [AuthKey.signUp];
}
