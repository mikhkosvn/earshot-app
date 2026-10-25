import { TEST_PROFILE_QUERY_KEY } from '@/lib/url-generator/constants';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { AgentRef, RunDetail } from '@/server/results/types';

export const agentChipText = (agent: AgentRef | null) => {
  if (!agent) return null;
  if (!agent.versionLabel) return agent.name;
  return `${agent.name} · ${agent.versionLabel}`;
};

export const agentHref = (agent: AgentRef | null) => {
  if (!agent) return null;
  return UrlGenerator.agent({ agentId: agent.id });
};

export const testProfileHref = (run: RunDetail, projectId: number) => {
  if (!run.testProfile) return null;
  return UrlGenerator.evaluators({
    values: {
      project: projectId,
      [TEST_PROFILE_QUERY_KEY]: run.testProfile.id,
    },
  });
};

const directionText = (inbound: boolean) => {
  if (inbound) return 'Inbound Call';
  return 'Outbound Call';
};

export const connectionText = (run: RunDetail) => {
  const direction = directionText(run.inbound);
  if (!run.testingNumber) return direction;
  return `${direction} (${run.testingNumber})`;
};

export const feedbackText = (feedback: string | null) => {
  if (feedback) return feedback;
  return 'No feedback provided';
};

export const evaluatorIdsOf = (run: RunDetail) => {
  if (run.evaluator.id === null) return [];
  return [run.evaluator.id];
};
