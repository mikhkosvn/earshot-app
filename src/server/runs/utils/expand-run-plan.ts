import 'server-only';

import type { EvaluatorSnapshot, RunPlanCase } from '@/server/runs/types';

export interface RunPlanSource {
  evaluatorId: number | null;
  evaluatorSnapshot: EvaluatorSnapshot;
  personalityId: number | null;
  testProfileId: number | null;
  frequency: number;
}

interface ExpandRunPlanArgs {
  sources: RunPlanSource[];
  personalityIds: number[];
  testProfileIds: number[];
}

const choices = (overrides: number[], fallback: number | null) => {
  if (overrides.length > 0) return overrides;
  return [fallback];
};

export const countPlannedRuns = ({
  sources,
  personalityIds,
  testProfileIds,
}: ExpandRunPlanArgs) =>
  sources.reduce((total, source) => total + source.frequency, 0) *
  Math.max(1, personalityIds.length) *
  Math.max(1, testProfileIds.length);

export const expandRunPlan = ({
  sources,
  personalityIds,
  testProfileIds,
}: ExpandRunPlanArgs): RunPlanCase[] => {
  const rounds = Math.max(0, ...sources.map((source) => source.frequency));
  const cases: RunPlanCase[] = [];
  for (let round = 0; round < rounds; round += 1) {
    for (const source of sources) {
      if (source.frequency <= round) continue;
      for (const personalityId of choices(
        personalityIds,
        source.personalityId,
      )) {
        for (const testProfileId of choices(
          testProfileIds,
          source.testProfileId,
        )) {
          cases.push({
            evaluatorId: source.evaluatorId,
            evaluatorSnapshot: source.evaluatorSnapshot,
            personalityId,
            testProfileId,
          });
        }
      }
    }
  }
  return cases;
};
