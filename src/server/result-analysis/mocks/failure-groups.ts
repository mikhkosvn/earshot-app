import 'server-only';

import type { AnalysisRun } from '@/server/result-analysis/types';

export const FailureGroupKind = {
  error: 'error',
  check: 'check',
  outcome: 'outcome',
} as const;

export type FailureGroupKind =
  (typeof FailureGroupKind)[keyof typeof FailureGroupKind];

export type FailureGroup = {
  kind: FailureGroupKind;
  label: string;
  detail: string;
  runIds: number[];
};

const UNMET_OUTCOME_LABEL = 'Expected outcome not met';

const firstSentence = (lines: string[]) => {
  const text = lines.join(' ').trim();
  const match = /^.*?[.!?](\s|$)/.exec(text);
  return (match?.[0] ?? text).trim();
};

const groupOf = (run: AnalysisRun): Omit<FailureGroup, 'runIds'> => {
  if (run.errorMessage) {
    return {
      kind: FailureGroupKind.error,
      label: run.errorMessage,
      detail: run.errorMessage,
    };
  }
  const check = run.failingChecks[0];
  if (check) {
    return {
      kind: FailureGroupKind.check,
      label: check.metricName,
      detail: firstSentence(check.explanation),
    };
  }
  return {
    kind: FailureGroupKind.outcome,
    label: UNMET_OUTCOME_LABEL,
    detail: '',
  };
};

export const groupFailures = (runs: AnalysisRun[]): FailureGroup[] => {
  const groups = new Map<string, FailureGroup>();
  for (const run of runs.filter((item) => item.failed)) {
    const group = groupOf(run);
    const key = `${group.kind}:${group.label}`;
    const existing = groups.get(key);
    if (existing) {
      existing.runIds.push(run.id);
      continue;
    }
    groups.set(key, { ...group, runIds: [run.id] });
  }
  return [...groups.values()].toSorted(
    (left, right) => right.runIds.length - left.runIds.length,
  );
};

export const runList = (runIds: number[]) => runIds.join(', ');
