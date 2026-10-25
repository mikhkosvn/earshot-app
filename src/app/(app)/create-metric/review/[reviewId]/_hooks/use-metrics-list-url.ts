'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export const useMetricsListUrl = () => {
  const projectId = useCurrentProjectId();
  return UrlGenerator.metrics({ values: { project: projectId } });
};
