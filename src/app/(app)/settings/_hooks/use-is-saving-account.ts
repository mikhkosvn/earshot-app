'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export const useIsSavingAccount = () =>
  useIsMutating({ mutationKey: ShellService.updateCurrentUserMutationKey }) > 0;
