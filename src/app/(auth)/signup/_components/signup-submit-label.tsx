'use client';

import { useIsSigningUp } from '@/app/(auth)/_hooks/use-is-signing-up';

export function SignupSubmitLabel() {
  const isSigningUp = useIsSigningUp();

  if (isSigningUp) return 'Creating account...';
  return 'Create account';
}
