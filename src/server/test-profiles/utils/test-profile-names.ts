import 'server-only';

export const defaultTestProfileName = (agent: { id: number; name: string }) =>
  `Default Test Profile - ${agent.name} (${agent.id})`;

export const generatedTestProfileName = (agentId: number) =>
  `test_profile_agent_${agentId}_${Date.now()}`;

export const copyTestProfileName = (name: string) => `Copy of ${name}`;
