import 'server-only';

import {
  CallerNumberMode,
  CreationMethod,
  type Language,
  ResultSource,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { createEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { RunMessage } from '@/server/runs/constants/run-messages';
import { testSuiteRequestSchema } from '@/server/runs/schemas';
import { prepareSpec } from '@/server/runs/spec/prepare-spec';
import type { ResolvedScenario } from '@/server/runs/spec/resolve-spec';
import type { CreatedRunBatch, EvaluatorSnapshot } from '@/server/runs/types';
import {
  expandRunPlan,
  type RunPlanSource,
} from '@/server/runs/utils/expand-run-plan';
import { insertRunBatch } from '@/server/runs/utils/insert-run-batch';
import {
  resolveMockToolIds,
  type RunAgent,
} from '@/server/runs/utils/run-references';

const NO_PERSONALITY_MESSAGE =
  'Enable a personality for this project before you save scenarios from a spec.';

const languageOf = (item: ResolvedScenario, agent: RunAgent): Language =>
  item.scenario.language ?? agent.language;

const snapshotOf = (
  item: ResolvedScenario,
  agent: RunAgent,
  evaluatorId: number | null,
): EvaluatorSnapshot => ({
  id: evaluatorId,
  key: item.key,
  name: item.scenario.name,
  scenarioType: item.scenario.type,
  instructions: item.scenario.instructions,
  expectedOutcomePrompt: item.scenario.expected_outcome ?? null,
  firstMessage: item.scenario.first_message ?? null,
  language: languageOf(item, agent),
  maxDurationSeconds: item.scenario.max_duration ?? null,
  tools: item.scenario.tools,
  tags: item.scenario.tags,
  metricIds: item.metricIds,
});

const savedPersonalityId = (item: ResolvedScenario) => {
  if (!item.personality) throw new ActionError(NO_PERSONALITY_MESSAGE);
  return item.personality.id;
};

const saveScenarios = (args: {
  projectId: number;
  userId: number;
  agent: RunAgent;
  folderPath: string;
  scenarios: ResolvedScenario[];
}): Promise<RunPlanSource[]> =>
  prisma.$transaction(async (tx) => {
    const sources: RunPlanSource[] = [];
    for (const item of args.scenarios) {
      const personalityId = savedPersonalityId(item);
      const created = await createEvaluatorRecord(tx, {
        projectId: args.projectId,
        userId: args.userId,
        creationMethod: CreationMethod.json_spec,
        fields: {
          agentId: args.agent.id,
          name: item.scenario.name,
          folderPath: args.folderPath,
          tags: item.scenario.tags,
          scenarioType: item.scenario.type,
          testProfileId: item.testProfileId,
          firstMessage: item.scenario.first_message ?? '',
          instructions: item.scenario.instructions,
          personalityId,
          language: languageOf(item, args.agent),
          expectedOutcomePrompt: item.scenario.expected_outcome ?? '',
          metricIds: item.metricIds,
          expectedToolCalls: [],
          phoneNumberId: null,
          tools: item.scenario.tools,
          maxDurationSeconds: item.scenario.max_duration ?? null,
        },
      });
      await recordEvaluatorVersion(tx, {
        evaluatorId: created.id,
        userId: args.userId,
      });
      sources.push({
        evaluatorId: created.id,
        evaluatorSnapshot: snapshotOf(item, args.agent, created.id),
        personalityId,
        testProfileId: item.testProfileId,
        frequency: item.frequency,
      });
    }
    return sources;
  });

const unsavedSources = (
  scenarios: ResolvedScenario[],
  agent: RunAgent,
): RunPlanSource[] =>
  scenarios.map((item) => ({
    evaluatorId: null,
    evaluatorSnapshot: snapshotOf(item, agent, null),
    personalityId: item.personality?.id ?? null,
    testProfileId: item.testProfileId ?? agent.defaultTestProfileId,
    frequency: item.frequency,
  }));

const sourcesOf = async (args: {
  projectId: number;
  userId: number;
  agent: RunAgent;
  saveScenarios: boolean;
  folderPath: string;
  scenarios: ResolvedScenario[];
}) => {
  if (!args.saveScenarios) return unsavedSources(args.scenarios, args.agent);
  return saveScenarios(args);
};

export const runTestSuite = withValidation(
  testSuiteRequestSchema,
  async (input): Promise<CreatedRunBatch> => {
    const { user } = await requireProjectAccess(input.projectId);
    const prepared = await prepareSpec(input);
    addEventFields({ agent: { id: input.agentId } });
    if (!prepared.ok) {
      addEventFields({
        spec: { valid: false, error_count: prepared.errors.length },
      });
      const [first] = prepared.errors;
      throw new ActionError(
        `${RunMessage.specInvalid} ${first.path}: ${first.message}`,
      );
    }
    const { agent, spec, resolved } = prepared;
    const sources = await sourcesOf({
      projectId: input.projectId,
      userId: user.id,
      agent,
      saveScenarios: spec.save_scenarios,
      folderPath: resolved.folderPath,
      scenarios: resolved.scenarios,
    });
    const batch = await insertRunBatch(
      {
        projectId: input.projectId,
        createdById: user.id,
        agentId: agent.id,
        source: ResultSource.user,
        name: spec.name ?? '',
        frequency: spec.frequency ?? 1,
        callsPerSecond: null,
        concurrencyLimit: null,
        callerNumberMode: CallerNumberMode.same_number,
        agentNumber: agent.phoneNumber ?? '',
        mockToolIds: resolveMockToolIds(agent, null),
        monitorRunId: null,
        apiKeyId: null,
      },
      expandRunPlan({ sources, personalityIds: [], testProfileIds: [] }),
    );
    addEventFields({
      result: {
        id: batch.resultId,
        run_count: batch.runIds.length,
        source: ResultSource.user,
      },
      spec: {
        valid: true,
        scenario_count: resolved.scenarios.length,
        save_scenarios: spec.save_scenarios,
      },
    });
    return batch;
  },
);
