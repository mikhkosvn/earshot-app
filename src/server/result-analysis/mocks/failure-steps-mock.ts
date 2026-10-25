import 'server-only';

import {
  MAX_FAILURE_REASONS,
  MAX_NEXT_STEPS,
} from '@/server/result-analysis/constants';
import {
  type FailureGroup,
  FailureGroupKind,
  groupFailures,
  runList,
} from '@/server/result-analysis/mocks/failure-groups';
import type {
  AnalysisRun,
  FailureReasonDraft,
  NextStepDraft,
} from '@/server/result-analysis/types';

const reasonText = (group: FailureGroup) => {
  if (group.kind === FailureGroupKind.error) {
    return `The call did not connect: ${group.detail}`;
  }
  if (group.detail) return `${group.label} failed: ${group.detail}`;
  return `${group.label} failed.`;
};

const stepOf = (group: FailureGroup): NextStepDraft => {
  if (group.kind === FailureGroupKind.error) {
    return {
      title: 'Check the agent connection',
      description: `Run ${runList(group.runIds)} did not connect. Make sure the agent phone number answers, then run these evaluators again.`,
    };
  }
  return {
    title: `Fix "${group.label}"`,
    description: `Review run ${runList(group.runIds)}. Change the agent prompt so that it passes the "${group.label}" check.`,
  };
};

const RERUN_STEP: NextStepDraft = {
  title: 'Run the failed evaluators again',
  description:
    'After the fix, select the failed evaluators and run them again to confirm the change.',
};

export const mockFailureReasons = (runs: AnalysisRun[]): FailureReasonDraft[] =>
  groupFailures(runs)
    .slice(0, MAX_FAILURE_REASONS)
    .map((group) => ({ description: reasonText(group), runIds: group.runIds }));

export const mockNextSteps = (runs: AnalysisRun[]): NextStepDraft[] => [
  ...groupFailures(runs)
    .slice(0, MAX_NEXT_STEPS - 1)
    .map(stepOf),
  RERUN_STEP,
];
