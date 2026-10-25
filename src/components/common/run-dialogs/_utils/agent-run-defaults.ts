import type { RunAgentConfiguration } from '@/server/runs/types';

export const agentPhoneNumber = (agent: RunAgentConfiguration | null) =>
  agent?.phoneNumber ?? '';

export const agentMockToolIds = (agent: RunAgentConfiguration | null) => {
  if (!agent?.mockToolsEnabled) return [];
  return agent.mockTools.map((tool) => tool.id);
};
