'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AgentService } from '../../_service';
import { useAgentId } from './use-agent-id';

export const useAgent = () => {
  const agentId = useAgentId();
  const { data } = useSuspenseQuery(AgentService.getAgentQuery({ agentId }));
  return data;
};
