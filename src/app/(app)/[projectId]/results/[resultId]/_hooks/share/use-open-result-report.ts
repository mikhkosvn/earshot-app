'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useResultId } from '../../../_hooks/use-result-id';

export const useOpenResultReport = () => {
  const projectId = useCurrentProjectId();
  const resultId = useResultId();

  return (metricIds: number[]) => {
    const url = UrlGenerator.resultReport({
      projectId,
      resultId,
      values: { metrics: metricIds },
    });
    window.open(url, '_blank', 'noopener');
  };
};
