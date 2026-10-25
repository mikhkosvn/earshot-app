import 'server-only';

import type { QueryClient } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export const prefetchCurrentProject = async (queryClient: QueryClient) => {
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  return queryClient.query({
    ...ShellService.getProjectQuery({ projectId }),
    retry: false,
  });
};
