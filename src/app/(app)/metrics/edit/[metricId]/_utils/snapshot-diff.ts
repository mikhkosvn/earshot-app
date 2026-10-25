import type { MetricSnapshot } from '@/server/metrics/types';

import { SNAPSHOT_FIELD_LABELS } from '../_constants/snapshot-field-labels';

export type SnapshotChange = {
  field: keyof MetricSnapshot;
  label: string;
  before: string;
  after: string;
};

const EMPTY_TEXT = '(empty)';

const valueText = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return EMPTY_TEXT;
  if (typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return EMPTY_TEXT;
    return value.map(String).join(', ');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const fields = Object.keys(SNAPSHOT_FIELD_LABELS) as (keyof MetricSnapshot)[];

export const diffSnapshots = (
  before: MetricSnapshot,
  after: MetricSnapshot,
): SnapshotChange[] =>
  fields
    .map((field) => ({
      field,
      label: SNAPSHOT_FIELD_LABELS[field],
      before: valueText(before[field]),
      after: valueText(after[field]),
    }))
    .filter((change) => change.before !== change.after);
