import 'server-only';

import {
  type FailureGroup,
  FailureGroupKind,
  groupFailures,
  runList,
} from '@/server/result-analysis/mocks/failure-groups';
import type {
  AiSummaryText,
  AnalysisInput,
} from '@/server/result-analysis/types';

const whyText = (group: FailureGroup) => {
  if (group.kind === FailureGroupKind.error) {
    return `The calls did not connect, so the Main Agent never answered. The call engine reported: "${group.detail}"`;
  }
  if (group.kind === FailureGroupKind.check && group.detail) {
    return `The "${group.label}" check failed. ${group.detail}`;
  }
  return `The Main Agent did not reach the expected outcome of the evaluator in run(s) ${runList(group.runIds)}.`;
};

const fixText = (group: FailureGroup, agentName: string) => {
  if (group.kind === FailureGroupKind.error) {
    return `Make sure the phone number of ${agentName} is correct and that the agent answers calls. Then run the failed evaluators again.`;
  }
  return `Update the prompt of ${agentName} so that it handles the case of the "${group.label}" check. Then run the failed evaluators again to confirm the fix.`;
};

export const mockAiSummary = (input: AnalysisInput): AiSummaryText => {
  const groups = groupFailures(input.runs);
  const failed = groups.reduce(
    (total, group) => total + group.runIds.length,
    0,
  );
  const [top] = groups;
  return {
    whatHappened: `${failed} of ${input.runs.length} calls failed. The most common problem was "${top.label}" in ${top.runIds.length} call(s) (run ${runList(top.runIds)}).`,
    whyItHappened: whyText(top),
    howToFix: fixText(top, input.agentName || 'the agent'),
  };
};
