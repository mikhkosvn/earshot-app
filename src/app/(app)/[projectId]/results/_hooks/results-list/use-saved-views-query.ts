'use client';

import { useQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { savedViewsQuery } from '../../_utils/results-list/saved-views-query';

export const useSavedViewsQuery = () => {
  const projectId = useCurrentProjectId();
  return useQuery(savedViewsQuery(projectId));
};
