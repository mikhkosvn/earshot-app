'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { ProviderKeyProvider } from '@/generated/prisma/enums';

import { ProviderKeysService } from '../_service';

export const useProviderKeyState = (provider: ProviderKeyProvider) => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery({
    ...ProviderKeysService.getKeysQuery({ projectId }),
    select: (states) => states.find((state) => state.provider === provider),
  });
  return data;
};
