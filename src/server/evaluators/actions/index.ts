'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { applyEvaluatorImprovements } from '@/server/evaluators/ai/apply-evaluator-improvements';
import { createEvaluatorFromTranscript } from '@/server/evaluators/ai/create-evaluator-from-transcript';
import { improveEvaluatorText } from '@/server/evaluators/ai/improve-evaluator-text';
import { proposeEvaluatorImprovements } from '@/server/evaluators/ai/propose-evaluator-improvements';
import { addEvaluatorTags } from '@/server/evaluators/bulk/add-evaluator-tags';
import { duplicateEvaluators } from '@/server/evaluators/bulk/duplicate-evaluators';
import { exportEvaluators } from '@/server/evaluators/bulk/export-evaluators';
import { modifyEvaluators } from '@/server/evaluators/bulk/modify-evaluators';
import { moveEvaluators } from '@/server/evaluators/bulk/move-evaluators';
import { createEvaluator } from '@/server/evaluators/crud/create-evaluator';
import { deleteEvaluators } from '@/server/evaluators/crud/delete-evaluators';
import { getEvaluator } from '@/server/evaluators/crud/get-evaluator';
import { listEvaluators } from '@/server/evaluators/crud/list-evaluators';
import { updateEvaluator } from '@/server/evaluators/crud/update-evaluator';
import { getAgentDefaults } from '@/server/evaluators/options/get-agent-evaluator-defaults';
import { listAgentOptions } from '@/server/evaluators/options/list-agent-options';
import { listMetricOptions } from '@/server/evaluators/options/list-metric-options';
import { listPersonalityOptions } from '@/server/evaluators/options/list-personality-options';
import { listPhoneNumberOptions } from '@/server/evaluators/options/list-phone-number-options';
import { listProjectOptions } from '@/server/evaluators/options/list-project-options';
import type {
  AddEvaluatorTagsInput,
  AgentEvaluatorDefaults,
  AgentOption,
  AgentScopeInput,
  ApplyEvaluatorImprovementsInput,
  CreateEvaluatorFromTranscriptInput,
  CreateEvaluatorInput,
  DuplicateEvaluatorsInput,
  EvaluatorDetail,
  EvaluatorFile,
  EvaluatorImprovementReply,
  EvaluatorListPage,
  EvaluatorSelectionInput,
  EvaluatorVersionView,
  ExportEvaluatorsInput,
  GetEvaluatorInput,
  ImproveEvaluatorTextInput,
  ListEvaluatorsInput,
  MetricOption,
  ModifyEvaluatorsInput,
  MoveEvaluatorsInput,
  PersonalityOption,
  PhoneNumberOption,
  ProjectOption,
  ProjectScopeInput,
  ProposeEvaluatorImprovementsInput,
  RestoreEvaluatorVersionInput,
  UpdateEvaluatorInput,
} from '@/server/evaluators/types';
import { listEvaluatorVersions } from '@/server/evaluators/versions/list-evaluator-versions';
import { restoreEvaluatorVersion } from '@/server/evaluators/versions/restore-evaluator-version';
import { EvaluatorsActionOperation } from '@/server/evaluators/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

interface CountResult {
  count: number;
}
interface CreatedEvaluator {
  id: number;
  folderPath: string;
}

export async function listEvaluatorsAction(
  args: ListEvaluatorsInput,
): Promise<EvaluatorListPage> {
  return withActionEvent(EvaluatorsActionOperation.listEvaluators, () =>
    listEvaluators(args),
  );
}

export async function getEvaluatorAction(
  args: GetEvaluatorInput,
): Promise<EvaluatorDetail> {
  return withActionEvent(EvaluatorsActionOperation.getEvaluator, () =>
    getEvaluator(args),
  );
}

export async function listEvaluatorVersionsAction(
  args: GetEvaluatorInput,
): Promise<EvaluatorVersionView[]> {
  return withActionEvent(EvaluatorsActionOperation.listEvaluatorVersions, () =>
    listEvaluatorVersions(args),
  );
}

export async function listAgentOptionsAction(
  args: ProjectScopeInput,
): Promise<AgentOption[]> {
  return withActionEvent(EvaluatorsActionOperation.listAgentOptions, () =>
    listAgentOptions(args),
  );
}

export async function listPersonalityOptionsAction(
  args: ProjectScopeInput,
): Promise<PersonalityOption[]> {
  return withActionEvent(EvaluatorsActionOperation.listPersonalityOptions, () =>
    listPersonalityOptions(args),
  );
}

export async function listMetricOptionsAction(
  args: ProjectScopeInput,
): Promise<MetricOption[]> {
  return withActionEvent(EvaluatorsActionOperation.listMetricOptions, () =>
    listMetricOptions(args),
  );
}

export async function listPhoneNumberOptionsAction(
  args: ProjectScopeInput,
): Promise<PhoneNumberOption[]> {
  return withActionEvent(EvaluatorsActionOperation.listPhoneNumberOptions, () =>
    listPhoneNumberOptions(args),
  );
}

export async function listProjectOptionsAction(
  args: ProjectScopeInput,
): Promise<ProjectOption[]> {
  return withActionEvent(EvaluatorsActionOperation.listProjectOptions, () =>
    listProjectOptions(args),
  );
}

export async function getAgentEvaluatorDefaultsAction(
  args: AgentScopeInput,
): Promise<AgentEvaluatorDefaults> {
  return withActionEvent(
    EvaluatorsActionOperation.getAgentEvaluatorDefaults,
    () => getAgentDefaults(args),
  );
}

export async function createEvaluatorAction(
  args: CreateEvaluatorInput,
): Promise<ActionResult<CreatedEvaluator>> {
  return withActionEvent(EvaluatorsActionOperation.createEvaluator, () =>
    runAction(() => createEvaluator(args)),
  );
}

export async function updateEvaluatorAction(
  args: UpdateEvaluatorInput,
): Promise<ActionResult<EvaluatorDetail>> {
  return withActionEvent(EvaluatorsActionOperation.updateEvaluator, () =>
    runAction(() => updateEvaluator(args)),
  );
}

export async function restoreEvaluatorVersionAction(
  args: RestoreEvaluatorVersionInput,
): Promise<ActionResult<EvaluatorDetail>> {
  return withActionEvent(
    EvaluatorsActionOperation.restoreEvaluatorVersion,
    () => runAction(() => restoreEvaluatorVersion(args)),
  );
}

export async function deleteEvaluatorsAction(
  args: EvaluatorSelectionInput,
): Promise<ActionResult<CountResult>> {
  return withActionEvent(EvaluatorsActionOperation.deleteEvaluators, () =>
    runAction(() => deleteEvaluators(args)),
  );
}

export async function addEvaluatorTagsAction(
  args: AddEvaluatorTagsInput,
): Promise<ActionResult<CountResult>> {
  return withActionEvent(EvaluatorsActionOperation.addEvaluatorTags, () =>
    runAction(() => addEvaluatorTags(args)),
  );
}

export async function moveEvaluatorsAction(
  args: MoveEvaluatorsInput,
): Promise<ActionResult<CountResult & { folderPath: string }>> {
  return withActionEvent(EvaluatorsActionOperation.moveEvaluators, () =>
    runAction(() => moveEvaluators(args)),
  );
}

export async function duplicateEvaluatorsAction(
  args: DuplicateEvaluatorsInput,
): Promise<ActionResult<CountResult & { evaluatorIds: number[] }>> {
  return withActionEvent(EvaluatorsActionOperation.duplicateEvaluators, () =>
    runAction(() => duplicateEvaluators(args)),
  );
}

export async function modifyEvaluatorsAction(
  args: ModifyEvaluatorsInput,
): Promise<ActionResult<CountResult>> {
  return withActionEvent(EvaluatorsActionOperation.modifyEvaluators, () =>
    runAction(() => modifyEvaluators(args)),
  );
}

export async function exportEvaluatorsAction(
  args: ExportEvaluatorsInput,
): Promise<ActionResult<EvaluatorFile>> {
  return withActionEvent(EvaluatorsActionOperation.exportEvaluators, () =>
    runAction(() => exportEvaluators(args)),
  );
}

export async function improveEvaluatorTextAction(
  args: ImproveEvaluatorTextInput,
): Promise<ActionResult<{ text: string }>> {
  return withActionEvent(EvaluatorsActionOperation.improveEvaluatorText, () =>
    runAction(() => improveEvaluatorText(args)),
  );
}

export async function proposeEvaluatorImprovementsAction(
  args: ProposeEvaluatorImprovementsInput,
): Promise<ActionResult<EvaluatorImprovementReply>> {
  return withActionEvent(
    EvaluatorsActionOperation.proposeEvaluatorImprovements,
    () => runAction(() => proposeEvaluatorImprovements(args)),
  );
}

export async function applyEvaluatorImprovementsAction(
  args: ApplyEvaluatorImprovementsInput,
): Promise<ActionResult<CountResult>> {
  return withActionEvent(
    EvaluatorsActionOperation.applyEvaluatorImprovements,
    () => runAction(() => applyEvaluatorImprovements(args)),
  );
}

export async function createEvaluatorFromTranscriptAction(
  args: CreateEvaluatorFromTranscriptInput,
): Promise<ActionResult<CreatedEvaluator>> {
  return withActionEvent(
    EvaluatorsActionOperation.createEvaluatorFromTranscript,
    () => runAction(() => createEvaluatorFromTranscript(args)),
  );
}
