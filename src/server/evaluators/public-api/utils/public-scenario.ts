import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { ScenarioToolDbValue } from '@/server/evaluators/public-api/constants';
import {
  publicPersonalitySelect,
  toPublicPersonalityId,
} from '@/server/personalities/public-api/public-personality-id';
import {
  publicTestProfileSelect,
  toPublicTestProfile,
} from '@/server/test-profiles/public-api/utils/public-test-profile';

export const publicScenarioSelect = {
  id: true,
  projectId: true,
  agentId: true,
  name: true,
  firstMessage: true,
  instructions: true,
  simulationDescription: true,
  expectedOutcomePrompt: true,
  language: true,
  scenarioType: true,
  testProfileId: true,
  maxDurationSeconds: true,
  createdAt: true,
  updatedAt: true,
  agent: { select: { providerAgentId: true } },
  personality: { select: { ...publicPersonalitySelect, name: true } },
  folder: { select: { path: true } },
  testProfile: { select: publicTestProfileSelect },
  tags: {
    select: { tag: { select: { name: true } } },
    orderBy: { tag: { name: Prisma.SortOrder.asc } },
  },
  tools: { select: { tool: true } },
  metrics: {
    select: { metricId: true, metric: { select: { name: true } } },
    orderBy: { metric: { displayOrder: Prisma.SortOrder.asc } },
  },
} satisfies Prisma.EvaluatorSelect;

export type PublicScenarioRow = Prisma.EvaluatorGetPayload<{
  select: typeof publicScenarioSelect;
}>;

const publicPersonalityIdOf = (row: PublicScenarioRow) => {
  if (!row.personality) return null;
  return toPublicPersonalityId(row.personality);
};

const publicTestProfileOf = (row: PublicScenarioRow) => {
  if (!row.testProfile) return null;
  return toPublicTestProfile(row.testProfile);
};

export const toPublicScenario = (row: PublicScenarioRow) => ({
  id: row.id,
  project: row.projectId,
  agent: row.agentId,
  name: row.name,
  personality: publicPersonalityIdOf(row),
  personality_name: row.personality?.name ?? null,
  tags: row.tags.map((entry) => entry.tag.name),
  tool_ids: row.tools.map((entry) => ScenarioToolDbValue[entry.tool]),
  metrics: row.metrics.map((entry) => entry.metricId),
  metric_names: row.metrics.map((entry) => entry.metric.name),
  first_message: row.firstMessage ?? '',
  instructions: row.instructions,
  conditional_actions: [],
  simulation_description: row.simulationDescription ?? '',
  information_fields: {},
  expected_outcome_prompt: row.expectedOutcomePrompt ?? '',
  scenario_language: row.language,
  scenario_type: row.scenarioType,
  suite_type: null,
  test_profile: row.testProfileId,
  test_profile_data: publicTestProfileOf(row),
  folder_path: row.folder?.path ?? null,
  max_duration: row.maxDurationSeconds,
  assistant_id: row.agent?.providerAgentId ?? null,
  inbound_phone_number: null,
  is_predefined: false,
  generated_mock_tool_entries: [],
  is_simulating: false,
  dynamic_variable_values: {},
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});
