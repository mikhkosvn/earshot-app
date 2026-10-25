import { LanguageLabel } from '@/server/agents/constants/language-labels';
import { ScenarioInputTypeLabel } from '@/server/evaluators/constants/scenario-input-type-labels';
import { ScenarioToolLabel } from '@/server/evaluators/constants/scenario-tool-labels';
import type { EvaluatorSnapshot } from '@/server/evaluators/types';

interface SnapshotField {
  label: string;
  read: (snapshot: EvaluatorSnapshot) => string;
}

const orNone = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') return '(none)';
  return String(value);
};

const list = (values: string[]) => orNone(values.join(', '));

const SNAPSHOT_FIELDS: SnapshotField[] = [
  { label: 'Name', read: (snapshot) => snapshot.name },
  { label: 'Agent', read: (snapshot) => orNone(snapshot.agentName) },
  { label: 'Folder', read: (snapshot) => orNone(snapshot.folderPath) },
  { label: 'Tags', read: (snapshot) => list(snapshot.tags) },
  {
    label: 'Scenario Input Type',
    read: (snapshot) => ScenarioInputTypeLabel[snapshot.scenarioType],
  },
  {
    label: 'Test Profile',
    read: (snapshot) => orNone(snapshot.testProfileName),
  },
  { label: 'First Message', read: (snapshot) => orNone(snapshot.firstMessage) },
  { label: 'Instructions', read: (snapshot) => snapshot.instructions },
  {
    label: 'Personality',
    read: (snapshot) => orNone(snapshot.personalityName),
  },
  { label: 'Language', read: (snapshot) => LanguageLabel[snapshot.language] },
  {
    label: 'Expected Outcome Prompt',
    read: (snapshot) => orNone(snapshot.expectedOutcomePrompt),
  },
  { label: 'Metrics', read: (snapshot) => list(snapshot.metricNames) },
  {
    label: 'Expected Mock Tools',
    read: (snapshot) =>
      list(snapshot.expectedToolCalls.map((call) => call.mockToolName)),
  },
  { label: 'Phone Number', read: (snapshot) => orNone(snapshot.phoneNumber) },
  {
    label: 'Tools',
    read: (snapshot) =>
      list(snapshot.tools.map((tool) => ScenarioToolLabel[tool])),
  },
  {
    label: 'Max Call Duration (seconds)',
    read: (snapshot) => orNone(snapshot.maxDurationSeconds),
  },
];

export interface SnapshotChange {
  label: string;
  from: string;
  to: string;
}

export const diffSnapshots = (
  from: EvaluatorSnapshot,
  to: EvaluatorSnapshot,
): SnapshotChange[] =>
  SNAPSHOT_FIELDS.flatMap((field) => {
    const before = field.read(from);
    const after = field.read(to);
    if (before === after) return [];
    return [{ label: field.label, from: before, to: after }];
  });
