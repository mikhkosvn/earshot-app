import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getAgentAction,
  listAgentOptionsAction,
  listAgentsAction,
  listAgentVersionsAction,
  listDynamicVariablesAction,
  listKnowledgeConnectorsAction,
  listKnowledgeFilesAction,
  listMockToolsAction,
} from '@/server/agents/actions';
import type { ListAgentsInput } from '@/server/agents/types';

export const AgentKey = {
  list: 'agent-list',
  options: 'agent-options',
  detail: 'agent-detail',
  knowledgeFiles: 'agent-knowledge-files',
  knowledgeConnectors: 'agent-knowledge-connectors',
  mockTools: 'agent-mock-tools',
  dynamicVariables: 'agent-dynamic-variables',
  versions: 'agent-versions',
  create: 'agent-create',
  checkConfig: 'agent-check-config',
  checkConnections: 'agent-check-connections',
  update: 'agent-update',
  duplicate: 'agent-duplicate',
  delete: 'agent-delete',
  reconfigure: 'agent-reconfigure',
  startTestCall: 'agent-start-test-call',
  uploadKnowledgeFile: 'agent-upload-knowledge-file',
  deleteKnowledgeFile: 'agent-delete-knowledge-file',
  createKnowledgeConnector: 'agent-create-knowledge-connector',
  deleteKnowledgeConnector: 'agent-delete-knowledge-connector',
  createMockTool: 'agent-create-mock-tool',
  updateMockTool: 'agent-update-mock-tool',
  deleteMockTool: 'agent-delete-mock-tool',
  setMockToolsEnabled: 'agent-set-mock-tools-enabled',
  addDynamicVariables: 'agent-add-dynamic-variables',
  updateDynamicVariable: 'agent-update-dynamic-variable',
  deleteDynamicVariable: 'agent-delete-dynamic-variable',
  renameVersion: 'agent-rename-version',
  restoreVersion: 'agent-restore-version',
} as const;

export type AgentKey = (typeof AgentKey)[keyof typeof AgentKey];

export class AgentService {
  static readonly listKey = [AgentKey.list];
  static readonly optionsKey = [AgentKey.options];
  static readonly createMutationKey = [AgentKey.create];
  static readonly checkConfigMutationKey = [AgentKey.checkConfig];
  static readonly checkConnectionsMutationKey = [AgentKey.checkConnections];
  static readonly updateMutationKey = [AgentKey.update];
  static readonly duplicateMutationKey = [AgentKey.duplicate];
  static readonly deleteMutationKey = [AgentKey.delete];
  static readonly reconfigureMutationKey = [AgentKey.reconfigure];
  static readonly startTestCallMutationKey = [AgentKey.startTestCall];
  static readonly uploadKnowledgeFileMutationKey = [
    AgentKey.uploadKnowledgeFile,
  ];
  static readonly deleteKnowledgeFileMutationKey = [
    AgentKey.deleteKnowledgeFile,
  ];
  static readonly createKnowledgeConnectorMutationKey = [
    AgentKey.createKnowledgeConnector,
  ];
  static readonly deleteKnowledgeConnectorMutationKey = [
    AgentKey.deleteKnowledgeConnector,
  ];
  static readonly createMockToolMutationKey = [AgentKey.createMockTool];
  static readonly updateMockToolMutationKey = [AgentKey.updateMockTool];
  static readonly deleteMockToolMutationKey = [AgentKey.deleteMockTool];
  static readonly setMockToolsEnabledMutationKey = [
    AgentKey.setMockToolsEnabled,
  ];
  static readonly addDynamicVariablesMutationKey = [
    AgentKey.addDynamicVariables,
  ];
  static readonly updateDynamicVariableMutationKey = [
    AgentKey.updateDynamicVariable,
  ];
  static readonly deleteDynamicVariableMutationKey = [
    AgentKey.deleteDynamicVariable,
  ];
  static readonly renameVersionMutationKey = [AgentKey.renameVersion];
  static readonly restoreVersionMutationKey = [AgentKey.restoreVersion];

  static getListQuery(args: ListAgentsInput) {
    return queryOptions({
      queryKey: [AgentKey.list, args],
      queryFn: () => deferAction(() => listAgentsAction(args)),
    });
  }

  static getOptionsQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [AgentKey.options, args],
      queryFn: () => deferAction(() => listAgentOptionsAction(args)),
    });
  }

  static getAgentQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.detail, args],
      queryFn: () => deferAction(() => getAgentAction(args)),
    });
  }

  static getKnowledgeFilesQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.knowledgeFiles, args],
      queryFn: () => deferAction(() => listKnowledgeFilesAction(args)),
    });
  }

  static getKnowledgeConnectorsQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.knowledgeConnectors, args],
      queryFn: () => deferAction(() => listKnowledgeConnectorsAction(args)),
    });
  }

  static getMockToolsQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.mockTools, args],
      queryFn: () => deferAction(() => listMockToolsAction(args)),
    });
  }

  static getDynamicVariablesQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.dynamicVariables, args],
      queryFn: () => deferAction(() => listDynamicVariablesAction(args)),
    });
  }

  static getVersionsQuery(args: { agentId: number }) {
    return queryOptions({
      queryKey: [AgentKey.versions, args],
      queryFn: () => deferAction(() => listAgentVersionsAction(args)),
      staleTime: 0,
    });
  }
}
