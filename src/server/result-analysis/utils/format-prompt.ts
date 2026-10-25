import 'server-only';

import {
  MAX_RUNS_IN_PROMPT,
  MAX_TRANSCRIPT_CHARACTERS,
} from '@/server/result-analysis/constants';
import type {
  AnalysisInput,
  AnalysisRun,
} from '@/server/result-analysis/types';

const clip = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}...`;
};

const failingText = (run: AnalysisRun) => {
  if (run.errorMessage) return `Error: ${run.errorMessage}`;
  if (run.failingChecks.length === 0) return 'Failing checks: none';
  return `Failing checks: ${run.failingChecks
    .map(
      (check) =>
        `${check.metricName} (${clip(check.explanation.join(' '), 300)})`,
    )
    .join('; ')}`;
};

const outcomeText = (run: AnalysisRun) => {
  if (run.success) return 'passed';
  if (run.failed) return 'failed';
  return run.status;
};

export const formatRun = (run: AnalysisRun) =>
  [
    `Run ${run.id}: evaluator "${run.evaluatorName}", outcome ${outcomeText(run)}`,
    `Expected outcome: ${run.expectedOutcome ?? 'none'}`,
    failingText(run),
    `Transcript:\n${clip(run.transcript || '(no conversation)', MAX_TRANSCRIPT_CHARACTERS)}`,
  ].join('\n');

export const formatAgent = (input: AnalysisInput) =>
  `Agent: ${input.agentName}\nAgent description: ${input.agentDescription}`;

export const formatRuns = (runs: AnalysisRun[]) =>
  runs.slice(0, MAX_RUNS_IN_PROMPT).map(formatRun).join('\n\n');
