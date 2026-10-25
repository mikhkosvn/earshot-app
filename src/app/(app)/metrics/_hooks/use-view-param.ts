'use client';

import { noop, useQueryClient } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { metricsParser } from '@/lib/url-generator/parsers';

import { MetricService } from '../_service';

const viewParsers = { view: metricsParser.view };

export const useViewParam = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();
  const [{ view }, setValues] = useQueryStates(viewParsers);

  const setView = (viewId: number | null) => {
    void queryClient
      .query(MetricService.getListQuery({ projectId, viewId }))
      .catch(noop);
    return setValues({ view: viewId });
  };

  return { viewId: view, setView };
};
