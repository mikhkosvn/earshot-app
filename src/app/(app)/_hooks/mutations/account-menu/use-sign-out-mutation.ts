'use client';

import { useMutation } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { signOutAction } from '@/server/auth/actions';

export const useSignOutMutation = () =>
  useMutation({
    mutationKey: ShellService.signOutMutationKey,
    mutationFn: () => signOutAction(),
    onSuccess: (result) => {
      if (!result.ok) return;
      window.location.assign(UrlGenerator.login());
    },
  });
