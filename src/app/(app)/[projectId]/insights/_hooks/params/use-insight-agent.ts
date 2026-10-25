'use client';

import { useQueryState } from 'nuqs';

import { insightsParsers } from '../../_constants/insights-params';

export const useInsightAgent = () => {
  const [agentId, setAgentId] = useQueryState('agent', insightsParsers.agent);
  return { agentId, setAgentId };
};
