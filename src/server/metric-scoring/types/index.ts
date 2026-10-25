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

export interface ScoreConversationInput {
  projectId: number;
  conversationId: number;
  metricIds?: number[];
}

export interface ComputeRubricVerdictInput {
  conversationId: number;
}

export interface ScoringTurn {
  role: TranscriptRole;
  content: string;
  startTime: number | null;
  endTime: number | null;
}

export interface ScoringAgent {
  id: number;
  name: string;
  description: string;
  language: string;
  inbound: boolean;
  phoneNumber: string | null;
}

export interface ScoringEvaluator {
  id: number;
  name: string;
  instructions: string;
  expectedOutcome: string | null;
  metricIds: number[];
}

export interface ScoringConversation {
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
}

export interface ScoringMetric {
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
}

export interface ScoreOutcome {
  status: MetricEvaluationStatus;
  value: MetricValue;
  explanation: string[];
  extra: Record<string, unknown> | null;
  errorMessage: string | null;
}

export interface DependencyResult {
  id: number;
  name: string;
  slug: string | null;
  value: MetricValue;
  explanation: string[];
}

export interface ScoringContext {
  conversation: ScoringConversation;
  metric: ScoringMetric;
  dependencies: DependencyResult[];
}

export interface RubricCondition {
  op: ComparisonOperator;
  field: string;
  value: boolean | number | string | string[];
}

export interface RubricBreakdownItem {
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
}

export interface RubricVerdict {
  passed: boolean;
  passedCount: number;
  failedCount: number;
  items: RubricBreakdownItem[];
}

export interface PythonRunResult {
  ok: boolean;
  result: MetricValue;
  explanation: string[];
  error: string | null;
}
