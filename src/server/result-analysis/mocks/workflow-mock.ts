import 'server-only';

import {
  MAX_WORKFLOW_PATHS,
  MIN_WORKFLOW_PATHS,
  PATH_LABEL_MAX_WORDS,
  PATH_MATCH_MIN_WORDS,
  PATH_WORD_MIN_LENGTH,
} from '@/server/result-analysis/constants';
import type {
  AnalysisInput,
  WorkflowPathDraft,
} from '@/server/result-analysis/types';

const SERVICE_VERBS = [
  'answer',
  'book',
  'schedule',
  'reschedule',
  'cancel',
  'provide',
  'take',
  'transfer',
  'collect',
  'confirm',
  'verify',
  'explain',
  'check',
  'update',
  'send',
  'handle',
  'give',
  'offer',
  'share',
  'route',
  'register',
  'order',
  'process',
  'reset',
  'help',
];

const VERB_PATTERN = new RegExp(
  `\\b(${SERVICE_VERBS.join('|')})(?:s|es)?\\b([^.,;:!?\\n]*)`,
  'gi',
);

const CLAUSE_END = /\b(and|or|but|while|when|if|so)\b/i;

const capitalize = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const labelOf = (verb: string, rest: string) => {
  const clause = rest.split(CLAUSE_END)[0] ?? '';
  const words = [verb.toLowerCase(), ...clause.trim().split(/\s+/)]
    .filter(Boolean)
    .slice(0, PATH_LABEL_MAX_WORDS);
  return capitalize(words.join(' '));
};

const pathsFromDescription = (description: string) => {
  const labels = new Map<string, string>();
  for (const match of description.matchAll(VERB_PATTERN)) {
    const label = labelOf(match[1], match[2]);
    if (label.split(' ').length < 2) continue;
    labels.set(label.toLowerCase(), label);
  }
  return [...labels.values()];
};

const GENERIC_WORDS = ['information', 'questions', 'details', 'about'];

const keyWords = (label: string) =>
  label
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .slice(1)
    .filter(
      (word) =>
        word.length >= PATH_WORD_MIN_LENGTH && !GENERIC_WORDS.includes(word),
    );

const isCovered = (label: string, transcripts: string[]) => {
  const words = keyWords(label);
  if (words.length === 0) return false;
  return transcripts.some(
    (text) =>
      words.filter((word) => text.includes(word)).length >=
      PATH_MATCH_MIN_WORDS,
  );
};

export const mockWorkflowCoverage = (
  input: AnalysisInput,
): WorkflowPathDraft[] => {
  const fromDescription = pathsFromDescription(input.agentDescription);
  const fromEvaluators = [
    ...new Set(input.runs.map((run) => run.evaluatorName).filter(Boolean)),
  ];
  const labels = [...fromDescription];
  if (labels.length < MIN_WORKFLOW_PATHS) labels.push(...fromEvaluators);
  const transcripts = input.runs
    .filter((run) => run.success)
    .map((run) => `${run.evaluatorName}\n${run.transcript}`.toLowerCase());
  return [...new Set(labels)]
    .slice(0, MAX_WORKFLOW_PATHS)
    .map((label) => ({ label, covered: isCovered(label, transcripts) }));
};
