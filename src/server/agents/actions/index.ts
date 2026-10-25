'use server';

import type { ActionResult } from '@/lib/action-result';
import { checkAgentConfig } from '@/server/agents/check-agent-config';
import { checkAgentConnections } from '@/server/agents/check-agent-connections';
import { createAgent } from '@/server/agents/create-agent';
import { deleteAgent } from '@/server/agents/delete-agent';
import { duplicateAgent } from '@/server/agents/duplicate-agent';
import { addDynamicVariables } from '@/server/agents/dynamic-variables/add-dynamic-variables';
import { deleteDynamicVariable } from '@/server/agents/dynamic-variables/delete-dynamic-variable';
import { listDynamicVariables } from '@/server/agents/dynamic-variables/list-dynamic-variables';
import { updateDynamicVariable } from '@/server/agents/dynamic-variables/update-dynamic-variable';
import { getAgent } from '@/server/agents/get-agent';
import { createKnowledgeConnector } from '@/server/agents/knowledge/create-knowledge-connector';
import { deleteKnowledgeConnector } from '@/server/agents/knowledge/delete-knowledge-connector';
import { deleteKnowledgeFile } from '@/server/agents/knowledge/delete-knowledge-file';
import { listKnowledgeConnectors } from '@/server/agents/knowledge/list-knowledge-connectors';
import { listKnowledgeFiles } from '@/server/agents/knowledge/list-knowledge-files';
import { uploadKnowledgeFile } from '@/server/agents/knowledge/upload-knowledge-file';
import { listAgentOptions } from '@/server/agents/list-agent-options';
import { listAgents } from '@/server/agents/list-agents';
import { createMockTool } from '@/server/agents/mock-tools/create-mock-tool';
import { deleteMockTool } from '@/server/agents/mock-tools/delete-mock-tool';
import { listMockTools } from '@/server/agents/mock-tools/list-mock-tools';
import { setMockToolsEnabled } from '@/server/agents/mock-tools/set-mock-tools-enabled';
import { updateMockTool } from '@/server/agents/mock-tools/update-mock-tool';
import { reconfigureAgent } from '@/server/agents/reconfigure-agent';
import { startTestCall } from '@/server/agents/test-calls/start-test-call';
import { updateAgent } from '@/server/agents/update-agent';
import type {
  AddDynamicVariablesInput,
  AgentDetail,
  AgentIdInput,
  AgentListPage,
  AgentOption,
  AgentVersionIdInput,
  AgentVersionList,
  CheckAgentConfigInput,
  ConnectionCheck,
  CreateAgentInput,
  CreatedAgent,
  CreateKnowledgeConnectorInput,
  CreateMockToolInput,
  DeleteAgentInput,
  DynamicVariableIdInput,
  DynamicVariableItem,
  KnowledgeConnectorIdInput,
  KnowledgeConnectorItem,
  KnowledgeFileIdInput,
  KnowledgeFileItem,
  ListAgentsInput,
  MockToolIdInput,
  MockToolItem,
  ProjectIdInput,
  RenameAgentVersionInput,
  SetMockToolsEnabledInput,
  StartedTestCall,
  UpdateAgentInput,
  UpdateDynamicVariableInput,
  UpdateMockToolInput,
  UploadKnowledgeFileInput,
} from '@/server/agents/types';
import { listAgentVersions } from '@/server/agents/versions/list-agent-versions';
import { renameAgentVersion } from '@/server/agents/versions/rename-agent-version';
import { restoreAgentVersion } from '@/server/agents/versions/restore-agent-version';
import { runAction } from '@/server/common/run-action';

interface AgentRef {
  agentId: number;
}
interface RecordRef {
  id: number;
  agentId: number;
}

export async function listAgentsAction(
  args: ListAgentsInput,
): Promise<AgentListPage> {
  return listAgents(args);
}

export async function listAgentOptionsAction(
  args: ProjectIdInput,
): Promise<AgentOption[]> {
  return listAgentOptions(args);
}

export async function getAgentAction(args: AgentIdInput): Promise<AgentDetail> {
  return getAgent(args);
}

export async function listKnowledgeFilesAction(
  args: AgentIdInput,
): Promise<KnowledgeFileItem[]> {
  return listKnowledgeFiles(args);
}

export async function listKnowledgeConnectorsAction(
  args: AgentIdInput,
): Promise<KnowledgeConnectorItem[]> {
  return listKnowledgeConnectors(args);
}

export async function listMockToolsAction(
  args: AgentIdInput,
): Promise<MockToolItem[]> {
  return listMockTools(args);
}

export async function listDynamicVariablesAction(
  args: AgentIdInput,
): Promise<DynamicVariableItem[]> {
  return listDynamicVariables(args);
}

export async function listAgentVersionsAction(
  args: AgentIdInput,
): Promise<AgentVersionList> {
  return listAgentVersions(args);
}

export async function checkAgentConfigAction(
  args: CheckAgentConfigInput,
): Promise<ActionResult<ConnectionCheck>> {
  return runAction(() => checkAgentConfig(args));
}

export async function checkAgentConnectionsAction(
  args: AgentIdInput,
): Promise<ActionResult<ConnectionCheck>> {
  return runAction(() => checkAgentConnections(args));
}

export async function createAgentAction(
  args: CreateAgentInput,
): Promise<ActionResult<CreatedAgent>> {
  return runAction(() => createAgent(args));
}

export async function updateAgentAction(
  args: UpdateAgentInput,
): Promise<ActionResult<AgentDetail>> {
  return runAction(() => updateAgent(args));
}

export async function duplicateAgentAction(
  args: AgentIdInput,
): Promise<ActionResult<AgentOption>> {
  return runAction(() => duplicateAgent(args));
}

export async function deleteAgentAction(
  args: DeleteAgentInput,
): Promise<ActionResult<AgentRef>> {
  return runAction(() => deleteAgent(args));
}

export async function reconfigureAgentAction(
  args: AgentIdInput,
): Promise<ActionResult<never>> {
  return runAction(() => reconfigureAgent(args));
}

export async function startTestCallAction(
  args: AgentIdInput,
): Promise<ActionResult<StartedTestCall>> {
  return runAction(() => startTestCall(args));
}

export async function uploadKnowledgeFileAction(
  args: UploadKnowledgeFileInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => uploadKnowledgeFile(args));
}

export async function deleteKnowledgeFileAction(
  args: KnowledgeFileIdInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => deleteKnowledgeFile(args));
}

export async function createKnowledgeConnectorAction(
  args: CreateKnowledgeConnectorInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => createKnowledgeConnector(args));
}

export async function deleteKnowledgeConnectorAction(
  args: KnowledgeConnectorIdInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => deleteKnowledgeConnector(args));
}

export async function createMockToolAction(
  args: CreateMockToolInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => createMockTool(args));
}

export async function updateMockToolAction(
  args: UpdateMockToolInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => updateMockTool(args));
}

export async function deleteMockToolAction(
  args: MockToolIdInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => deleteMockTool(args));
}

export async function setMockToolsEnabledAction(
  args: SetMockToolsEnabledInput,
): Promise<ActionResult<{ id: number; mockToolsEnabled: boolean }>> {
  return runAction(() => setMockToolsEnabled(args));
}

export async function addDynamicVariablesAction(
  args: AddDynamicVariablesInput,
): Promise<ActionResult<{ agentId: number; count: number }>> {
  return runAction(() => addDynamicVariables(args));
}

export async function updateDynamicVariableAction(
  args: UpdateDynamicVariableInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => updateDynamicVariable(args));
}

export async function deleteDynamicVariableAction(
  args: DynamicVariableIdInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => deleteDynamicVariable(args));
}

export async function renameAgentVersionAction(
  args: RenameAgentVersionInput,
): Promise<ActionResult<RecordRef>> {
  return runAction(() => renameAgentVersion(args));
}

export async function restoreAgentVersionAction(
  args: AgentVersionIdInput,
): Promise<ActionResult<{ id: number; version: number }>> {
  return runAction(() => restoreAgentVersion(args));
}
