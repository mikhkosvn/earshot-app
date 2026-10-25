import type { z } from 'zod';

import type {
  ChatRole,
  GenerationSessionStatus,
  JobStatus,
  Language,
  ScenarioTool,
} from '@/generated/prisma/enums';
import type {
  answerEvaluatorAssistantSchema,
  assistantJobInputSchema,
  assistantJobResultSchema,
  clarificationQuestionSchema,
  generationJobInputSchema,
  generationJobResultSchema,
  generationOptionsSchema,
  generationSessionIdSchema,
  listGenerationSessionsSchema,
  startEvaluatorAssistantSchema,
} from '@/server/evaluator-generation/schemas';

export type GenerationOptionsValues = z.input<typeof generationOptionsSchema>;
export type GenerationOptions = z.output<typeof generationOptionsSchema>;
export type StartEvaluatorAssistantInput = z.input<
  typeof startEvaluatorAssistantSchema
>;
export type AnswerEvaluatorAssistantInput = z.input<
  typeof answerEvaluatorAssistantSchema
>;
export type GenerationSessionIdInput = z.input<
  typeof generationSessionIdSchema
>;
export type ListGenerationSessionsInput = z.input<
  typeof listGenerationSessionsSchema
>;
export type AssistantJobInput = z.output<typeof assistantJobInputSchema>;
export type GenerationJobInput = z.output<typeof generationJobInputSchema>;

export interface StartedAssistant {
  jobId: string;
  sessionId: number;
}

export type ClarificationQuestion = z.output<
  typeof clarificationQuestionSchema
>;
export type AssistantJobResult = z.output<typeof assistantJobResultSchema>;
export type GenerationJobResult = z.output<typeof generationJobResultSchema>;

export interface GenerationJobView<TResult> {
  id: string;
  status: JobStatus;
  currentStep: string | null;
  result: TResult | null;
  error: string | null;
}

export interface GenerationMessageView {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

export interface GeneratedEvaluatorView {
  id: number;
  name: string;
  instructions: string;
  expectedOutcomePrompt: string;
  personalityName: string | null;
  language: Language;
  testProfileName: string | null;
  tools: ScenarioTool[];
}

export interface GenerationSessionView {
  id: number;
  title: string;
  status: GenerationSessionStatus;
  agentId: number | null;
  agentName: string | null;
  folderPath: string;
  numScenarios: number;
  messages: GenerationMessageView[];
  evaluators: GeneratedEvaluatorView[];
  assistantJob: GenerationJobView<AssistantJobResult> | null;
  generationJob: GenerationJobView<GenerationJobResult> | null;
  createdAt: Date;
}

export interface GenerationSessionSummary {
  id: number;
  title: string;
  status: GenerationSessionStatus;
  agentName: string | null;
  evaluatorCount: number;
  createdAt: Date;
}
