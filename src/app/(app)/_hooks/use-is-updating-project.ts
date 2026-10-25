'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export const useIsUpdatingProject = () =>
  useIsMutating({ mutationKey: ShellService.updateProjectMutationKey }) > 0;
