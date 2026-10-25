import type {
  ComparisonOperator,
  EvaluationTrigger,
  MetricEvalType,
  MetricEvaluationStatus,
  MetricType,
  TranscriptRole,
  TriggerType,
} from '@/generated/prisma/enums';
import type { DecodedWav } from '@/server/call-engine/audio/decode-wav';
import type { ScoringSource } from '@/server/metric-scoring/constants';
import type { MetricValue } from '@/server/metrics/types';

export type ScoreConversationInput = {
  projectId: number;
  conversationId: number;
  metricIds?: number[];
};

export type ComputeRubricVerdictInput = {
  conversationId: number;
};

export type ScoringTurn = {
  role: TranscriptRole;
  content: string;
  startTime: number | null;
  endTime: number | null;
};

export type ScoringAgent = {
  id: number;
  name: string;
  description: string;
  language: string;
  inbound: boolean;
  phoneNumber: string | null;
};

export type ScoringEvaluator = {
  id: number;
  name: string;
  instructions: string;
  expectedOutcome: string | null;
  metricIds: number[];
};

export type ScoringConversation = {
  id: number;
  projectId: number;
  source: ScoringSource;
  runId: number | null;
  callLogId: number | null;
  turns: ScoringTurn[];
  recording: DecodedWav | null;
  recordingUrl: string | null;
  mainChannelIndex: number;
  durationSeconds: number;
  endedReason: string | null;
  startedAt: Date | null;
  metadata: Record<string, unknown>;
  dynamicVariables: Record<string, unknown>;
  providerCallData: Record<string, unknown>;
  testProfile: Record<string, string>;
  agent: ScoringAgent | null;
  evaluator: ScoringEvaluator | null;
  projectSampleRate: number;
};

export type ScoringMetric = {
  id: number;
  name: string;
  slug: string | null;
  description: string;
  type: MetricType;
  evalType: MetricEvalType;
  enumValues: string[];
  audioEnabled: boolean;
  customCode: string | null;
  functionName: string | null;
  configuration: Record<string, number> | null;
  evaluationTrigger: EvaluationTrigger;
  triggerType: TriggerType;
  evaluationTriggerPrompt: string | null;
  evaluationTriggerCustomCode: string | null;
  samplingEnabled: boolean;
  sampleRate: number | null;
  dependencyIds: number[];
};

export type ScoreOutcome = {
  status: MetricEvaluationStatus;
  value: MetricValue;
  explanation: string[];
  extra: Record<string, unknown> | null;
  errorMessage: string | null;
};

export type DependencyResult = {
  id: number;
  name: string;
  slug: string | null;
  value: MetricValue;
  explanation: string[];
};

export type ScoringContext = {
  conversation: ScoringConversation;
  metric: ScoringMetric;
  dependencies: DependencyResult[];
};

export type RubricCondition = {
  op: ComparisonOperator;
  field: string;
  value: boolean | number | string | string[];
};

export type RubricBreakdownItem = {
  metricId: number;
  metricName: string;
  value: MetricValue;
  passed: boolean;
  conditions: string;
  explanation: string[];
  expectedConditions: {
    operator: 'and';
    conditions: RubricCondition[];
  };
};

export type RubricVerdict = {
  passed: boolean;
  passedCount: number;
  failedCount: number;
  items: RubricBreakdownItem[];
};

export type PythonRunResult = {
  ok: boolean;
  result: MetricValue;
  explanation: string[];
  error: string | null;
};
