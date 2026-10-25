import 'server-only';

import { z } from 'zod';

import { EvaluationTrigger, TriggerType } from '@/generated/prisma/enums';
import { generateObject } from '@/server/ai/generate-object';
import type { LabDraft } from '@/server/labs/types';
import {
  OPTIMIZER_SYSTEM_PROMPT,
  SUMMARY_HEADINGS,
} from '@/server/metric-optimizer/constants/optimizer-text';
import type { ProposalSummary } from '@/server/metric-optimizer/types';
import { proposalMock } from '@/server/metric-optimizer/utils/proposal-mock';
import type { ScoringMetric } from '@/server/metric-scoring/types';
import type { MetricValue } from '@/server/metrics/types';

const TRANSCRIPT_EXCERPT_TURNS = 16;
const PROPOSAL_MAX_TOKENS = 8000;

export interface OptimizerRow {
  reviewId: number;
  expected: MetricValue;
  actual: MetricValue;
  matched: boolean;
  feedback: string | null;
  explanation: string[];
  transcript: string[];
}

export interface ProposalRequest {
  metric: ScoringMetric;
  rows: OptimizerRow[];
  iteration: number;
  budget: number;
}

export interface MetricProposal extends LabDraft {
  summary: ProposalSummary;
}

const proposalSchema = z.object({
  description: z.string(),
  customCode: z.string(),
  evaluationTrigger: z.enum(EvaluationTrigger),
  triggerType: z.enum(TriggerType),
  evaluationTriggerPrompt: z.string(),
  evaluationTriggerCustomCode: z.string(),
  summary: z.object({
    whatChanged: z.array(z.string()),
    whatItChecks: z.string(),
    returnsFalseWhen: z.string(),
    returnsTrueWhen: z.string(),
    notApplicableWhen: z.string(),
  }),
});

const valueText = (value: MetricValue) => JSON.stringify(value);

const matchText = (matched: boolean) => {
  if (matched) return 'match';
  return 'no match';
};

const rowText = (row: OptimizerRow, index: number) =>
  [
    `Row ${index + 1}: expected ${valueText(row.expected)}, actual ${valueText(row.actual)}, ${matchText(row.matched)}.`,
    `Reviewer note: ${row.feedback ?? 'none'}`,
    `Judge explanation:\n${row.explanation.join('\n')}`,
    `Transcript excerpt:\n${row.transcript.slice(0, TRANSCRIPT_EXCERPT_TURNS).join('\n')}`,
  ].join('\n');

const definitionText = (metric: ScoringMetric) =>
  [
    `Metric name: ${metric.name}`,
    `Metric form: ${metric.type}`,
    `Metric type: ${metric.evalType}`,
    `Enum values: ${JSON.stringify(metric.enumValues)}`,
    `Description:\n${metric.description}`,
    `Custom code:\n${metric.customCode ?? ''}`,
    `Evaluation trigger: ${metric.evaluationTrigger} (${metric.triggerType})`,
    `Trigger prompt:\n${metric.evaluationTriggerPrompt ?? ''}`,
    `Trigger code:\n${metric.evaluationTriggerCustomCode ?? ''}`,
  ].join('\n');

export const proposeMetric = async (
  request: ProposalRequest,
): Promise<MetricProposal> => {
  const proposal = await generateObject({
    system: OPTIMIZER_SYSTEM_PROMPT,
    prompt: [
      `Iteration ${request.iteration} of ${request.budget}.`,
      `Current definition:\n${definitionText(request.metric)}`,
      `Lab rows:\n\n${request.rows.map(rowText).join('\n\n')}`,
    ].join('\n\n'),
    schema: proposalSchema,
    maxTokens: PROPOSAL_MAX_TOKENS,
    mock: () => proposalMock(request),
  });
  return { ...proposal, type: request.metric.type };
};

export const summaryText = (summary: ProposalSummary) =>
  [
    SUMMARY_HEADINGS.whatChanged,
    ...summary.whatChanged.map((line) => `- ${line}`),
    `${SUMMARY_HEADINGS.whatItChecks} ${summary.whatItChecks}`,
    `${SUMMARY_HEADINGS.returnsFalseWhen} ${summary.returnsFalseWhen}`,
    `${SUMMARY_HEADINGS.returnsTrueWhen} ${summary.returnsTrueWhen}`,
    `${SUMMARY_HEADINGS.notApplicableWhen} ${summary.notApplicableWhen}`,
  ].join('\n');
