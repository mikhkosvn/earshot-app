import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { enabledPersonalityWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';
import { RunMessage } from '@/server/runs/constants/run-messages';
import type {
  SpecScenario,
  TestSuiteSpec,
} from '@/server/runs/schemas/test-suite-spec';
import type { SpecIssue } from '@/server/runs/types';
import type { RunAgent } from '@/server/runs/utils/run-references';

export interface ResolvedScenario {
  index: number;
  key: string;
  scenario: SpecScenario;
  frequency: number;
  metricIds: number[];
  personality: { id: number; name: string } | null;
  testProfileId: number | null;
}

export interface ResolvedSpec {
  errors: SpecIssue[];
  scenarios: ResolvedScenario[];
  folderPath: string;
}

interface ProjectMetric {
  id: number;
  name: string;
  slug: string | null;
  simulationEnabled: boolean;
  agents: { agentId: number }[];
}

const scenarioPath = (index: number, field?: string) => {
  if (!field) return `scenarios[${index}]`;
  return `scenarios[${index}].${field}`;
};

const loadMetrics = (projectId: number) =>
  prisma.metric.findMany({
    where: { projectId },
    select: {
      id: true,
      name: true,
      slug: true,
      simulationEnabled: true,
      agents: { select: { agentId: true } },
    },
  });

const loadPersonalities = async (projectId: number, spec: TestSuiteSpec) => {
  const ids = spec.scenarios.flatMap((scenario) => {
    if (!scenario.personality) return [];
    return [scenario.personality];
  });
  const rows = await prisma.personality.findMany({
    where: { id: { in: ids }, ...enabledPersonalityWhere(projectId) },
    select: { id: true, name: true },
  });
  return new Map(rows.map((row) => [row.id, row]));
};

const loadTestProfiles = async (
  projectId: number,
  agentId: number,
  spec: TestSuiteSpec,
) => {
  const ids = spec.scenarios.flatMap((scenario) => {
    if (!scenario.test_profile) return [];
    return [scenario.test_profile];
  });
  const rows = await prisma.testProfile.findMany({
    where: { id: { in: ids }, projectId, agentId },
    select: { id: true },
  });
  return new Set(rows.map((row) => row.id));
};

const findMetric = (metrics: ProjectMetric[], reference: number | string) => {
  if (typeof reference === 'number') {
    return metrics.find((metric) => metric.id === reference);
  }
  return metrics.find((metric) => metric.slug === reference);
};

const metricProblem = (metric: ProjectMetric, agentId: number) => {
  if (!metric.simulationEnabled) {
    return `The metric "${metric.name}" has its Simulation toggle turned off.`;
  }
  const agentIds = metric.agents.map((entry) => entry.agentId);
  if (agentIds.length > 0 && !agentIds.includes(agentId)) {
    return `The metric "${metric.name}" is not enabled for this agent.`;
  }
  return null;
};

const resolveMetrics = (
  scenario: SpecScenario,
  index: number,
  metrics: ProjectMetric[],
  agentId: number,
  errors: SpecIssue[],
) =>
  scenario.metrics.flatMap((reference, metricIndex) => {
    const path = `${scenarioPath(index, 'metrics')}[${metricIndex}]`;
    const metric = findMetric(metrics, reference);
    if (!metric) {
      errors.push({
        path,
        message: `The metric "${reference}" does not exist in this project.`,
      });
      return [];
    }
    const problem = metricProblem(metric, agentId);
    if (problem) {
      errors.push({ path, message: problem });
      return [];
    }
    return [metric.id];
  });

const folderErrors = async (projectId: number, folderPath: string) => {
  const folder = await prisma.folder.findUnique({
    where: { projectId_path: { projectId, path: folderPath } },
    select: { id: true },
  });
  if (folder) return [];
  return [{ path: 'folder', message: 'The folder does not exist.' }];
};

const NO_PERSONALITY_MESSAGE =
  'Enable a personality for this project before you save scenarios from a spec.';

const savedScenarioPersonality = async (
  projectId: number,
  spec: TestSuiteSpec,
  errors: SpecIssue[],
) => {
  if (!spec.save_scenarios) return null;
  const personality = await prisma.personality.findFirst({
    where: enabledPersonalityWhere(projectId),
    orderBy: [{ name: Prisma.SortOrder.asc }, { id: Prisma.SortOrder.asc }],
    select: { id: true, name: true },
  });
  if (!personality) {
    errors.push({ path: 'save_scenarios', message: NO_PERSONALITY_MESSAGE });
  }
  return personality;
};

const keyOf = (scenario: SpecScenario, index: number) =>
  scenario.key ?? `scenario_${index + 1}`;

export const resolveSpec = async (args: {
  projectId: number;
  agent: RunAgent;
  spec: TestSuiteSpec;
}): Promise<ResolvedSpec> => {
  const { projectId, agent, spec } = args;
  const errors: SpecIssue[] = [];
  if (!agent.phoneNumber) {
    errors.push({ path: 'agent', message: RunMessage.agentNoPhoneNumber });
  }
  const folderPath = spec.folder ?? DEFAULT_FOLDER_PATH;
  if (spec.save_scenarios) {
    errors.push(...(await folderErrors(projectId, folderPath)));
  }
  const metrics = await loadMetrics(projectId);
  const personalities = await loadPersonalities(projectId, spec);
  const testProfiles = await loadTestProfiles(projectId, agent.id, spec);
  const fallback = await savedScenarioPersonality(projectId, spec, errors);
  const scenarios = spec.scenarios.map((scenario, index) => {
    const personality = personalities.get(scenario.personality ?? 0) ?? null;
    if (scenario.personality && !personality) {
      errors.push({
        path: scenarioPath(index, 'personality'),
        message: RunMessage.personalityNotEnabled,
      });
    }
    if (scenario.test_profile && !testProfiles.has(scenario.test_profile)) {
      errors.push({
        path: scenarioPath(index, 'test_profile'),
        message: RunMessage.testProfileOtherAgent,
      });
    }
    return {
      index,
      key: keyOf(scenario, index),
      scenario,
      frequency: scenario.frequency ?? spec.frequency ?? 1,
      metricIds: resolveMetrics(scenario, index, metrics, agent.id, errors),
      personality: personality ?? fallback,
      testProfileId: scenario.test_profile ?? null,
    };
  });
  return { errors, scenarios, folderPath };
};
