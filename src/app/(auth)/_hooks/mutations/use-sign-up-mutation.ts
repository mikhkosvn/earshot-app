'use client';

import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/(auth)/_service';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { signUpAction } from '@/server/auth/actions';
import type { SignUpInput } from '@/server/auth/types';

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: AuthService.signUpMutationKey,
    mutationFn: (input: SignUpInput) => signUpAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      window.location.assign(
        UrlGenerator.agents({ values: { project: result.data.projectId } }),
      );
    },
  });
