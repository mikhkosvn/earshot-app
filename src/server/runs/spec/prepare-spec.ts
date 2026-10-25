import 'server-only';

import { RunChannel } from '@/server/runs/constants/run-channel';
import { RUN_BATCH_MAX_RUNS } from '@/server/runs/constants/run-limits';
import { RunMessage } from '@/server/runs/constants/run-messages';
import type { TestSuiteSpec } from '@/server/runs/schemas/test-suite-spec';
import { parseSpec, SPEC_ROOT_PATH } from '@/server/runs/spec/parse-spec';
import {
  type ResolvedSpec,
  resolveSpec,
} from '@/server/runs/spec/resolve-spec';
import type { SpecCheck, SpecIssue, TestSuitePlan } from '@/server/runs/types';
import {
  loadRunAgent,
  type RunAgent,
} from '@/server/runs/utils/run-references';

const DEFAULT_PERSONALITY_NAME = 'Default caller';

export type PreparedSpec =
  | {
      ok: true;
      agent: RunAgent;
      spec: TestSuiteSpec;
      resolved: ResolvedSpec;
      plan: TestSuitePlan;
    }
  | { ok: false; errors: SpecIssue[] };

const buildPlan = (
  agent: RunAgent,
  spec: TestSuiteSpec,
  resolved: ResolvedSpec,
): TestSuitePlan => {
  const scenarios = resolved.scenarios.map((item) => ({
    key: item.key,
    name: item.scenario.name,
    frequency: item.frequency,
    runs: item.frequency,
    metricCount: item.metricIds.length,
    personalityName: item.personality?.name ?? DEFAULT_PERSONALITY_NAME,
  }));
  return {
    suiteName: spec.name ?? '',
    channel: RunChannel.voice,
    agentNumber: agent.phoneNumber ?? '',
    scenarioCount: scenarios.length,
    totalRuns: scenarios.reduce((total, item) => total + item.runs, 0),
    saveScenarios: spec.save_scenarios,
    scenarios,
  };
};

export const prepareSpec = async (args: {
  projectId: number;
  agentId: number;
  specText: string;
}): Promise<PreparedSpec> => {
  const agent = await loadRunAgent(args.projectId, args.agentId);
  const parsed = parseSpec(args.specText);
  if (!parsed.ok) return parsed;
  const resolved = await resolveSpec({
    projectId: args.projectId,
    agent,
    spec: parsed.spec,
  });
  if (resolved.errors.length > 0) {
    return { ok: false, errors: resolved.errors };
  }
  const plan = buildPlan(agent, parsed.spec, resolved);
  if (plan.totalRuns > RUN_BATCH_MAX_RUNS) {
    return {
      ok: false,
      errors: [{ path: SPEC_ROOT_PATH, message: RunMessage.tooManyRuns }],
    };
  }
  return { ok: true, agent, spec: parsed.spec, resolved, plan };
};

export const toSpecCheck = (prepared: PreparedSpec): SpecCheck => {
  if (!prepared.ok) {
    return { valid: false, errors: prepared.errors, plan: null };
  }
  return { valid: true, errors: [], plan: prepared.plan };
};
