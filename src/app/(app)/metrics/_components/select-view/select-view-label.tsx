'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { useViewParam } from '../../_hooks/use-view-param';
import { MetricService } from '../../_service';

export function SelectViewLabel() {
  const projectId = useCurrentProjectId();
  const { viewId } = useViewParam();
  const { data: views } = useSuspenseQuery(
    MetricService.getSavedViewsQuery({ projectId }),
  );
  const view = views.find((item) => item.id === viewId);

  if (!view) return <span>Select View</span>;
  return <span className="truncate">{view.name}</span>;
}
