'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { InsightService } from '../../_service';
import { useInsightAgent } from '../params/use-insight-agent';
import { useInsightRange } from '../params/use-insight-range';

export const useInsightsOverviewQuery = () => {
  const projectId = useCurrentProjectId();
  const { from, to } = useInsightRange();
  const { agentId } = useInsightAgent();
  return useSuspenseQuery(
    InsightService.getOverviewQuery({ projectId, from, to, agentId }),
  );
};
