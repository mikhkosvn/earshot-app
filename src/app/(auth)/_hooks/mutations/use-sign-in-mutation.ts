'use client';

import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/(auth)/_service';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { signInAction } from '@/server/auth/actions';
import type { SignInInput } from '@/server/auth/types';

export const useSignInMutation = () =>
  useMutation({
    mutationKey: AuthService.signInMutationKey,
    mutationFn: (input: SignInInput) => signInAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      window.location.assign(UrlGenerator.rootUrl());
    },
  });
