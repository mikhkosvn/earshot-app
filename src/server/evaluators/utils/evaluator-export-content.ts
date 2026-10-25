import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { TestProfileVariableSide } from '@/generated/prisma/enums';
import { TEST_SUITE_SPEC_VERSION } from '@/server/evaluators/constants/evaluator-export';

export const exportSourceSelect = {
  id: true,
  name: true,
  scenarioType: true,
  agentId: true,
  projectId: true,
  personalityId: true,
  testProfileId: true,
  firstMessage: true,
  instructions: true,
  simulationDescription: true,
  expectedOutcomePrompt: true,
  maxDurationSeconds: true,
  language: true,
  createdAt: true,
  updatedAt: true,
  agent: { select: { name: true } },
  project: { select: { name: true } },
  personality: { select: { name: true } },
  folder: { select: { path: true } },
  phoneNumber: { select: { phoneNumber: true } },
  createdBy: { select: { name: true } },
  testProfile: {
    select: {
      id: true,
      name: true,
      agentId: true,
      variables: {
        select: { side: true, key: true, value: true },
        orderBy: { position: Prisma.SortOrder.asc },
      },
    },
  },
  tags: { select: { tag: { select: { name: true } } } },
  tools: { select: { tool: true } },
  metrics: {
    select: {
      metric: {
        select: { id: true, name: true, slug: true, predefinedMetricId: true },
      },
    },
    orderBy: { metric: { displayOrder: Prisma.SortOrder.asc } },
  },
} satisfies Prisma.EvaluatorSelect;

export type ExportSource = Prisma.EvaluatorGetPayload<{
  select: typeof exportSourceSelect;
}>;

const CSV_HEADER = [
  'scenario_id',
  'scenario_name',
  'scenario_type',
  'agent_id',
  'agent_name',
  'project_id',
  'project_name',
  'personality_id',
  'personality_name',
  'test_profile',
  'folder_path',
  'first_message',
  'instructions',
  'simulation_description',
  'expected_outcome_prompt',
  'max_duration',
  'scenario_language',
  'phone_number',
  'tags',
  'metrics',
  'created_at',
  'updated_at',
  'created_by',
];

const variablesObject = (source: ExportSource, side: TestProfileVariableSide) =>
  Object.fromEntries(
    (source.testProfile?.variables ?? [])
      .filter((variable) => variable.side === side)
      .map((variable) => [variable.key, variable.value]),
  );

const testProfileJson = (source: ExportSource) => {
  if (!source.testProfile) return '';
  return JSON.stringify({
    id: source.testProfile.id,
    name: source.testProfile.name,
    agent: source.testProfile.agentId,
    information: {
      main_agent_variables: variablesObject(
        source,
        TestProfileVariableSide.main_agent,
      ),
      testing_agent_variables: variablesObject(
        source,
        TestProfileVariableSide.testing_agent,
      ),
    },
  });
};

const csvCell = (value: string | number | null | undefined) => {
  const text = String(value ?? '');
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
};

const csvRow = (source: ExportSource) =>
  [
    source.id,
    source.name,
    source.scenarioType,
    source.agentId,
    source.agent?.name,
    source.projectId,
    source.project.name,
    source.personalityId,
    source.personality?.name,
    testProfileJson(source),
    source.folder?.path,
    source.firstMessage,
    source.instructions,
    source.simulationDescription,
    source.expectedOutcomePrompt,
    source.maxDurationSeconds,
    source.language,
    source.phoneNumber?.phoneNumber,
    JSON.stringify(source.tags.map((entry) => entry.tag.name)),
    JSON.stringify(source.metrics.map((entry) => entry.metric.id)),
    source.createdAt.toISOString(),
    source.updatedAt.toISOString(),
    source.createdBy?.name,
  ]
    .map(csvCell)
    .join(',');

export const toEvaluatorCsv = (sources: ExportSource[]) =>
  [CSV_HEADER.join(','), ...sources.map(csvRow)].join('\n');

const specMetric = (metric: ExportSource['metrics'][number]['metric']) => {
  if (metric.predefinedMetricId && metric.slug) return metric.slug;
  return metric.id;
};

const specScenario = (source: ExportSource) => ({
  key: `scenario_${source.id}`,
  name: source.name,
  type: source.scenarioType,
  instructions: source.instructions,
  first_message: source.firstMessage ?? '',
  expected_outcome: source.expectedOutcomePrompt ?? '',
  tags: source.tags.map((entry) => entry.tag.name),
  language: source.language,
  max_duration: source.maxDurationSeconds,
  personality: source.personalityId,
  test_profile: source.testProfileId,
  tools: source.tools.map((entry) => entry.tool),
  metrics: source.metrics.map((entry) => specMetric(entry.metric)),
});

export const toTestSuiteSpec = (sources: ExportSource[]) =>
  JSON.stringify(
    { version: TEST_SUITE_SPEC_VERSION, scenarios: sources.map(specScenario) },
    null,
    2,
  );
