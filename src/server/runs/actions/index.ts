'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { cancelResult } from '@/server/runs/cancel-result';
import { getRunAgentConfiguration } from '@/server/runs/get-run-agent-configuration';
import { getRunBatchStatus } from '@/server/runs/get-run-batch-status';
import { getRunDefaults } from '@/server/runs/get-run-defaults';
import { reevaluateConversations } from '@/server/runs/reevaluation/reevaluate-conversations';
import { reevaluateResult } from '@/server/runs/reevaluation/reevaluate-result';
import { checkTestSuite } from '@/server/runs/spec/check-test-suite';
import { runTestSuite } from '@/server/runs/spec/run-test-suite';
import { startRunBatch } from '@/server/runs/start-run-batch';
import type {
  CancelledResult,
  CreatedRunBatch,
  ReevaluateConversationsInput,
  ReevaluateResultInput,
  ResultIdInput,
  RunAgentConfiguration,
  RunAgentInput,
  RunBatchStatus,
  RunDefaults,
  RunDefaultsInput,
  SpecCheck,
  StartedReevaluation,
  StartRunInput,
  TestSuiteRequestInput,
} from '@/server/runs/types';
import { RunsActionOperation } from '@/server/runs/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getRunDefaultsAction(
  args: RunDefaultsInput,
): Promise<RunDefaults> {
  return withActionEvent(RunsActionOperation.getRunDefaults, () =>
    getRunDefaults(args),
  );
}

export async function getRunAgentConfigurationAction(
  args: RunAgentInput,
): Promise<RunAgentConfiguration> {
  return withActionEvent(RunsActionOperation.getRunAgentConfiguration, () =>
    getRunAgentConfiguration(args),
  );
}

export async function getRunBatchStatusAction(
  args: ResultIdInput,
): Promise<RunBatchStatus> {
  return withActionEvent(RunsActionOperation.getRunBatchStatus, () =>
    getRunBatchStatus(args),
  );
}

export async function startRunAction(
  args: StartRunInput,
): Promise<ActionResult<CreatedRunBatch>> {
  return withActionEvent(RunsActionOperation.startRun, () =>
    runAction(() => startRunBatch(args)),
  );
}

export async function checkTestSuiteAction(
  args: TestSuiteRequestInput,
): Promise<ActionResult<SpecCheck>> {
  return withActionEvent(RunsActionOperation.checkTestSuite, () =>
    runAction(() => checkTestSuite(args)),
  );
}

export async function runTestSuiteAction(
  args: TestSuiteRequestInput,
): Promise<ActionResult<CreatedRunBatch>> {
  return withActionEvent(RunsActionOperation.runTestSuite, () =>
    runAction(() => runTestSuite(args)),
  );
}

export async function cancelResultAction(
  args: ResultIdInput,
): Promise<ActionResult<CancelledResult>> {
  return withActionEvent(RunsActionOperation.cancelResult, () =>
    runAction(() => cancelResult(args)),
  );
}

export async function reevaluateResultAction(
  args: ReevaluateResultInput,
): Promise<ActionResult<StartedReevaluation>> {
  return withActionEvent(RunsActionOperation.reevaluateResult, () =>
    runAction(() => reevaluateResult(args)),
  );
}

export async function reevaluateConversationsAction(
  args: ReevaluateConversationsInput,
): Promise<ActionResult<StartedReevaluation>> {
  return withActionEvent(RunsActionOperation.reevaluateConversations, () =>
    runAction(() => reevaluateConversations(args)),
  );
}
