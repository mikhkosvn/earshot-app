import 'server-only';

import { noop, type QueryClient } from '@tanstack/react-query';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';

import { OrganizationSettingsService } from '../_service';

export const prefetchOrganizationSettings = async (
  queryClient: QueryClient,
) => {
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...OrganizationSettingsService.getSettingsQuery({
        organizationId: project.organizationId,
      }),
      retry: false,
    })
    .catch(noop);
  return project;
};
