import type { z } from 'zod';

import type {
  CallerNumberMode,
  CallEvaluationStatus,
  ResultSource,
  RunStatus,
  ScenarioType,
} from '@/generated/prisma/enums';
import type { RunChannel } from '@/server/runs/constants/run-channel';
import type {
  reevaluateConversationsSchema,
  reevaluateResultSchema,
  resultIdSchema,
  runAgentSchema,
  runDefaultsSchema,
  runSettingsSchema,
  startRunSchema,
  testSuiteRequestSchema,
} from '@/server/runs/schemas';

export type RunSettingsValues = z.input<typeof runSettingsSchema>;
export type StartRunInput = z.input<typeof startRunSchema>;
export type TestSuiteRequestInput = z.input<typeof testSuiteRequestSchema>;
export type ResultIdInput = z.input<typeof resultIdSchema>;
export type ReevaluateResultInput = z.input<typeof reevaluateResultSchema>;
export type ReevaluateConversationsInput = z.input<
  typeof reevaluateConversationsSchema
>;
export type RunDefaultsInput = z.input<typeof runDefaultsSchema>;
export type RunAgentInput = z.input<typeof runAgentSchema>;

export type CreateRunBatchArgs = {
  projectId: number;
  createdById: number | null;
  agentId: number;
  evaluatorIds: number[];
  personalityIds?: number[] | null;
  frequency?: number;
  source: ResultSource;
  name?: string;
  callsPerSecond?: number | null;
  monitorRunId?: number | null;
  testProfileIds?: number[] | null;
  concurrencyLimit?: number | null;
  callerNumberMode?: CallerNumberMode;
  agentNumber?: string | null;
  mockToolIds?: number[] | null;
  apiKeyId?: number | null;
};

export type CreatedRunBatch = {
  resultId: number;
  runIds: number[];
};

export type EvaluatorSnapshot = {
  id: number | null;
  key: string | null;
  name: string;
  scenarioType: ScenarioType;
  instructions: string;
  expectedOutcomePrompt: string | null;
  firstMessage: string | null;
  language: string;
  maxDurationSeconds: number | null;
  tools: string[];
  tags: string[];
  metricIds: number[];
};

export type TestProfileSnapshot = {
  id: number;
  name: string;
  mainAgentVariables: Record<string, string>;
  testingAgentVariables: Record<string, string>;
};

export type RunPlanCase = {
  evaluatorId: number | null;
  personalityId: number | null;
  testProfileId: number | null;
  evaluatorSnapshot: EvaluatorSnapshot;
};

export type RunBatchSettings = {
  projectId: number;
  createdById: number | null;
  agentId: number;
  source: ResultSource;
  name: string;
  frequency: number;
  callsPerSecond: number | null;
  concurrencyLimit: number | null;
  callerNumberMode: CallerNumberMode;
  agentNumber: string;
  mockToolIds: number[];
  monitorRunId: number | null;
  apiKeyId: number | null;
};

export type RunBatchStatusRun = {
  id: number;
  evaluatorName: string;
  personalityName: string | null;
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
  errorMessage: string | null;
};

export type RunBatchStatus = {
  resultId: number;
  projectId: number;
  name: string;
  status: RunStatus;
  totalRuns: number;
  finishedRuns: number;
  successRuns: number;
  failedRuns: number;
  runs: RunBatchStatusRun[];
};

export type RunDefaults = {
  agentId: number | null;
  maxConcurrentRuns: number;
};

export type RunMockTool = {
  id: number;
  name: string;
};

export type SkippedMetric = {
  id: number;
  name: string;
};

export type RunAgentConfiguration = {
  agentId: number;
  phoneNumber: string | null;
  mockToolsEnabled: boolean;
  mockTools: RunMockTool[];
  skippedMetrics: SkippedMetric[];
};

export type SpecIssue = {
  path: string;
  message: string;
};

export type PlanScenario = {
  key: string;
  name: string;
  frequency: number;
  runs: number;
  metricCount: number;
  personalityName: string;
};

export type TestSuitePlan = {
  suiteName: string;
  channel: RunChannel;
  agentNumber: string;
  scenarioCount: number;
  totalRuns: number;
  saveScenarios: boolean;
  scenarios: PlanScenario[];
};

export type SpecCheck =
  | { valid: true; errors: []; plan: TestSuitePlan }
  | { valid: false; errors: SpecIssue[]; plan: null };

export type StartedReevaluation = {
  jobId: string;
};

export type CancelledResult = {
  resultId: number;
  cancelledCount: number;
};
