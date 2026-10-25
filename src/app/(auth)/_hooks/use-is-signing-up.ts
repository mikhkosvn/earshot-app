'use client';

import { useIsMutating } from '@tanstack/react-query';

import { AuthService } from '@/app/(auth)/_service';

export const useIsSigningUp = () =>
  useIsMutating({ mutationKey: AuthService.signUpMutationKey }) > 0;
