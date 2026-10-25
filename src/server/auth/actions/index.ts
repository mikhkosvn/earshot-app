'use server';

import type { ActionResult } from '@/lib/action-result';
import { isSignupOpen } from '@/server/auth/is-signup-open';
import { signIn } from '@/server/auth/sign-in';
import { signOut } from '@/server/auth/sign-out';
import { signUp } from '@/server/auth/sign-up';
import type { SignInInput, SignUpInput } from '@/server/auth/types';
import { runAction } from '@/server/common/run-action';

export async function signInAction(
  args: SignInInput,
): Promise<ActionResult<{ userId: number }>> {
  return runAction(() => signIn(args));
}

export async function signUpAction(
  args: SignUpInput,
): Promise<ActionResult<{ userId: number; projectId: number }>> {
  return runAction(() => signUp(args));
}

export async function signOutAction(): Promise<
  ActionResult<{ signedOut: boolean }>
> {
  return runAction(() => signOut());
}

export async function isSignupOpenAction(): Promise<boolean> {
  return isSignupOpen();
}
