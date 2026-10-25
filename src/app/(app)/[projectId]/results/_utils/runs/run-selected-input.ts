import type {
  RunAgentConfiguration,
  RunDefaults,
  StartRunInput,
} from '@/server/runs/types';

type RunSelectedInputArgs = {
  projectId: number;
  agentId: number;
  evaluatorIds: number[];
  defaults: RunDefaults;
  agent: RunAgentConfiguration | null;
};

const mockToolIdsOf = (agent: RunAgentConfiguration | null) => {
  if (!agent?.mockToolsEnabled) return [];
  return agent.mockTools.map((tool) => tool.id);
};

export const runSelectedInput = ({
  projectId,
  agentId,
  evaluatorIds,
  defaults,
  agent,
}: RunSelectedInputArgs): StartRunInput => ({
  projectId,
  agentId,
  evaluatorIds,
  name: '',
  frequency: 1,
  agentNumber: agent?.phoneNumber ?? '',
  mockToolIds: mockToolIdsOf(agent),
  randomize: false,
  personalityIds: [],
  testProfileIds: [],
  concurrencyLimit: defaults.maxConcurrentRuns,
  callsPerSecond: null,
});
