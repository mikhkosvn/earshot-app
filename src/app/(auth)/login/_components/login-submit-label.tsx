'use client';

import { useIsSigningIn } from '@/app/(auth)/_hooks/use-is-signing-in';

export function LoginSubmitLabel() {
  const isSigningIn = useIsSigningIn();

  if (isSigningIn) return 'Signing in...';
  return 'Sign In';
}
