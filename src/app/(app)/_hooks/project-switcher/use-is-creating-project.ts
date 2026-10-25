'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export const useIsCreatingProject = () =>
  useIsMutating({ mutationKey: ShellService.createProjectMutationKey }) > 0;
