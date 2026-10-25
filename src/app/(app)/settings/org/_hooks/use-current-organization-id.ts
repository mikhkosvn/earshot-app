'use client';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';

export const useCurrentOrganizationId = () => {
  const project = useCurrentProject();
  return project.organizationId;
};
