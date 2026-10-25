import type { z } from 'zod';

import type {
  AgentProvider,
  HistoryChangeType,
  KnowledgeConnectorType,
  Language,
  RedactionField,
} from '@/generated/prisma/enums';
import type { ConnectionType } from '@/server/agents/constants/connection-type';
import type {
  addDynamicVariablesSchema,
  agentConfigSchema,
  agentIdSchema,
  agentSettingsSchema,
  agentVersionIdSchema,
  checkAgentConfigSchema,
  createAgentSchema,
  createKnowledgeConnectorSchema,
  createMockToolSchema,
  deleteAgentSchema,
  dynamicVariableIdSchema,
  dynamicVariableValuesSchema,
  knowledgeConnectorFormSchema,
  knowledgeConnectorIdSchema,
  knowledgeFileIdSchema,
  listAgentsSchema,
  mockToolIdSchema,
  mockToolMappingSchema,
  projectIdSchema,
  renameAgentVersionSchema,
  setMockToolsEnabledSchema,
  testCallProgressSchema,
  testConnectionProgressSchema,
  testStepSchema,
  testTranscriptLineSchema,
  updateAgentSchema,
  updateDynamicVariableSchema,
  updateMockToolSchema,
  uploadKnowledgeFileSchema,
} from '@/server/agents/schemas';

export type AgentIdInput = z.input<typeof agentIdSchema>;
export type ProjectIdInput = z.input<typeof projectIdSchema>;
export type ListAgentsInput = z.input<typeof listAgentsSchema>;
export type AgentConfigValues = z.input<typeof agentConfigSchema>;
export type AgentSettingsValues = z.input<typeof agentSettingsSchema>;
export type CreateAgentInput = z.input<typeof createAgentSchema>;
export type CheckAgentConfigInput = z.input<typeof checkAgentConfigSchema>;
export type UpdateAgentInput = z.input<typeof updateAgentSchema>;
export type DeleteAgentInput = z.input<typeof deleteAgentSchema>;
export type SetMockToolsEnabledInput = z.input<
  typeof setMockToolsEnabledSchema
>;
export type UploadKnowledgeFileInput = z.input<
  typeof uploadKnowledgeFileSchema
>;
export type KnowledgeFileIdInput = z.input<typeof knowledgeFileIdSchema>;
export type KnowledgeConnectorFormValues = z.input<
  typeof knowledgeConnectorFormSchema
>;
export type CreateKnowledgeConnectorInput = z.input<
  typeof createKnowledgeConnectorSchema
>;
export type KnowledgeConnectorIdInput = z.input<
  typeof knowledgeConnectorIdSchema
>;
export type MockToolMappingValue = z.output<typeof mockToolMappingSchema>;
export type CreateMockToolInput = z.input<typeof createMockToolSchema>;
export type UpdateMockToolInput = z.input<typeof updateMockToolSchema>;
export type MockToolIdInput = z.input<typeof mockToolIdSchema>;
export type DynamicVariableValues = z.input<typeof dynamicVariableValuesSchema>;
export type AddDynamicVariablesInput = z.input<
  typeof addDynamicVariablesSchema
>;
export type UpdateDynamicVariableInput = z.input<
  typeof updateDynamicVariableSchema
>;
export type DynamicVariableIdInput = z.input<typeof dynamicVariableIdSchema>;
export type RenameAgentVersionInput = z.input<typeof renameAgentVersionSchema>;
export type AgentVersionIdInput = z.input<typeof agentVersionIdSchema>;

export interface AgentListItem {
  id: number;
  name: string;
  provider: AgentProvider;
  language: Language;
  phoneNumber: string | null;
  inbound: boolean;
}

export interface AgentListPage {
  count: number;
  results: AgentListItem[];
}

export interface AgentOption {
  id: number;
  name: string;
}

export interface AgentDetail {
  id: number;
  projectId: number;
  name: string;
  description: string;
  language: Language;
  provider: AgentProvider;
  phoneNumber: string | null;
  inbound: boolean;
  providerAgentId: string | null;
  apiKeyConfigured: boolean;
  providerConfig: Record<string, string>;
  autoImportCalls: boolean;
  autoSyncPrompt: boolean;
  sendPostConversationMetadata: boolean;
  redactionFields: RedactionField[];
  webhookUrl: string | null;
  webhookSecretConfigured: boolean;
  mockToolsEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeFileItem {
  id: number;
  fileId: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  createdAt: Date;
}

export interface KnowledgeConnectorItem {
  id: number;
  name: string;
  type: KnowledgeConnectorType;
  syncEnabled: boolean;
  syncIntervalDays: number;
  url: string | null;
  lastSyncedAt: Date | null;
  createdAt: Date;
}

export interface MockToolItem {
  id: number;
  name: string;
  description: string | null;
  mappings: MockToolMappingValue[];
  failureCount: number;
}

export interface DynamicVariableItem {
  id: number;
  name: string;
  description: string;
}

export interface AgentVersionItem {
  id: number;
  version: number;
  name: string | null;
  changeType: HistoryChangeType;
  changeReason: string | null;
  isCurrent: boolean;
  createdAt: Date;
  createdByEmail: string | null;
}

export interface AgentVersionList {
  count: number;
  results: AgentVersionItem[];
}

export interface ConnectionCheckItem {
  type: ConnectionType;
  target: string | null;
  testable: boolean;
  blockedReason: string | null;
}

export interface ConnectionCheck {
  valid: boolean;
  message: string | null;
  connections: ConnectionCheckItem[];
}

export interface CreatedAgent {
  id: number;
  name: string;
  check: ConnectionCheck;
}

export type TestStep = z.output<typeof testStepSchema>;

export type TestTranscriptLine = z.output<typeof testTranscriptLineSchema>;

export type TestConnectionProgress = z.output<
  typeof testConnectionProgressSchema
>;

export type TestCallProgress = z.output<typeof testCallProgressSchema>;

export interface StartedTestCall {
  jobId: string;
}
