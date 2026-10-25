import type { z } from 'zod';

import type {
  CreationMethod,
  HistoryChangeType,
  Language,
  ScenarioTool,
  ScenarioType,
} from '@/generated/prisma/enums';
import type { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';
import type {
  applyEvaluatorImprovementsSchema,
  createEvaluatorFromTranscriptSchema,
  improveEvaluatorTextSchema,
  proposeEvaluatorImprovementsSchema,
  transcriptTurnSchema,
} from '@/server/evaluators/schemas/evaluator-ai';
import type {
  addEvaluatorTagsSchema,
  duplicateEvaluatorsSchema,
  evaluatorSelectionSchema,
  exportEvaluatorsSchema,
  modifyEvaluatorsFieldsSchema,
  modifyEvaluatorsSchema,
  moveEvaluatorsSchema,
} from '@/server/evaluators/schemas/evaluator-bulk';
import type {
  agentScopeSchema,
  createEvaluatorSchema,
  projectScopeSchema,
  evaluatorExpectedToolCallViewSchema,
  evaluatorFieldsSchema,
  evaluatorSnapshotSchema,
  expectedToolCallSchema,
  getEvaluatorSchema,
  restoreEvaluatorVersionSchema,
  updateEvaluatorSchema,
} from '@/server/evaluators/schemas/evaluator-fields';
import type {
  evaluatorFilterSchema,
  listEvaluatorsSchema,
} from '@/server/evaluators/schemas/evaluator-list';

export type ProjectScopeInput = z.input<typeof projectScopeSchema>;
export type AgentScopeInput = z.input<typeof agentScopeSchema>;
export type EvaluatorFieldsValues = z.input<typeof evaluatorFieldsSchema>;
export type EvaluatorFieldsOutput = z.output<typeof evaluatorFieldsSchema>;
export type ExpectedToolCallValues = z.input<typeof expectedToolCallSchema>;
export type CreateEvaluatorInput = z.input<typeof createEvaluatorSchema>;
export type UpdateEvaluatorInput = z.input<typeof updateEvaluatorSchema>;
export type GetEvaluatorInput = z.input<typeof getEvaluatorSchema>;
export type RestoreEvaluatorVersionInput = z.input<
  typeof restoreEvaluatorVersionSchema
>;
export type EvaluatorFilterInput = z.input<typeof evaluatorFilterSchema>;
export type ListEvaluatorsInput = z.input<typeof listEvaluatorsSchema>;
export type EvaluatorSelectionInput = z.input<typeof evaluatorSelectionSchema>;
export type AddEvaluatorTagsInput = z.input<typeof addEvaluatorTagsSchema>;
export type MoveEvaluatorsInput = z.input<typeof moveEvaluatorsSchema>;
export type DuplicateEvaluatorsInput = z.input<
  typeof duplicateEvaluatorsSchema
>;
export type ModifyEvaluatorsFieldsValues = z.input<
  typeof modifyEvaluatorsFieldsSchema
>;
export type ModifyEvaluatorsInput = z.input<typeof modifyEvaluatorsSchema>;
export type ExportEvaluatorsInput = z.input<typeof exportEvaluatorsSchema>;
export type ImproveEvaluatorTextInput = z.input<
  typeof improveEvaluatorTextSchema
>;
export type ProposeEvaluatorImprovementsInput = z.input<
  typeof proposeEvaluatorImprovementsSchema
>;
export type ApplyEvaluatorImprovementsInput = z.input<
  typeof applyEvaluatorImprovementsSchema
>;
export type TranscriptTurnInput = z.input<typeof transcriptTurnSchema>;
export type CreateEvaluatorFromTranscriptInput = z.input<
  typeof createEvaluatorFromTranscriptSchema
>;

export interface EvaluatorListRow {
  id: number;
  name: string;
  folderPath: string | null;
  personalityName: string | null;
  agentId: number | null;
  agentName: string | null;
  phoneNumber: string | null;
  testProfileName: string | null;
  language: Language;
  metricCount: number;
  tags: string[];
  instructions: string;
  expectedOutcomePrompt: string | null;
  createdAt: Date;
  createdByName: string | null;
  updatedAt: Date;
  updatedByName: string | null;
}

export interface EvaluatorListPage {
  count: number;
  rows: EvaluatorListRow[];
}

export type EvaluatorExpectedToolCallView = z.output<
  typeof evaluatorExpectedToolCallViewSchema
>;

export interface EvaluatorDetail {
  id: number;
  projectId: number;
  name: string;
  agentId: number | null;
  agentName: string | null;
  folderPath: string | null;
  tags: string[];
  scenarioType: ScenarioType;
  testProfileId: number | null;
  testProfileName: string | null;
  firstMessage: string;
  instructions: string;
  personalityId: number | null;
  personalityName: string | null;
  language: Language;
  expectedOutcomePrompt: string;
  metricIds: number[];
  metricNames: string[];
  expectedToolCalls: EvaluatorExpectedToolCallView[];
  phoneNumberId: number | null;
  phoneNumber: string | null;
  tools: ScenarioTool[];
  maxDurationSeconds: number | null;
  creationMethod: CreationMethod;
  createdAt: Date;
  createdByName: string | null;
  updatedAt: Date;
  updatedByName: string | null;
}

export type EvaluatorSnapshot = z.output<typeof evaluatorSnapshotSchema>;

export interface EvaluatorVersionView {
  id: number;
  version: number;
  changeType: HistoryChangeType;
  changeReason: string | null;
  createdAt: Date;
  createdByName: string | null;
  isCurrent: boolean;
  snapshot: EvaluatorSnapshot;
}

export interface EvaluatorFile {
  fileName: string;
  mimeType: string;
  content: string;
}

export interface EvaluatorImprovementProposal {
  evaluatorId: number;
  evaluatorName: string;
  kind: EvaluatorTextKind;
  before: string;
  after: string;
  reason: string;
}

export interface EvaluatorImprovementReply {
  message: string;
  evaluatorCount: number;
  proposals: EvaluatorImprovementProposal[];
}

export interface AgentOption {
  id: number;
  name: string;
  language: Language;
  defaultTestProfileId: number | null;
}

export interface PersonalityOption {
  id: number;
  name: string;
  language: Language;
}

export interface MetricOption {
  id: number;
  name: string;
}

export interface PhoneNumberOption {
  id: number;
  phoneNumber: string;
  name: string;
}

export interface ProjectOption {
  id: number;
  name: string;
}

export interface MockToolOption {
  id: number;
  name: string;
}

export interface AgentEvaluatorDefaults {
  agentId: number;
  defaultTestProfileId: number | null;
  personalityId: number | null;
  language: Language;
  metricIds: number[];
  mockTools: MockToolOption[];
}
