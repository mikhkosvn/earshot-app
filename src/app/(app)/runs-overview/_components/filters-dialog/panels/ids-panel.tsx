'use client';

import { useState } from 'react';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

type IdsPanelProps = {
  draft: RunsOverviewFilters;
  onChange: (draft: RunsOverviewFilters) => void;
};

const parseIds = (text: string) => [
  ...new Set(
    text
      .split(/[\s,]+/)
      .map((part) => Number(part))
      .filter((id) => Number.isInteger(id) && id > 0),
  ),
];

const PLACEHOLDER = 'Type or paste IDs, comma separated';

export function IdsPanel({ draft, onChange }: IdsPanelProps) {
  const [resultText, setResultText] = useState(draft.resultIds.join(', '));
  const [runText, setRunText] = useState(draft.runIds.join(', '));

  return (
    <div className="flex flex-col gap-4">
      <Field className="gap-1.5">
        <FieldLabel htmlFor="overview-result-ids" className="text-xs">
          Result IDs
        </FieldLabel>
        <Input
          id="overview-result-ids"
          value={resultText}
          placeholder={PLACEHOLDER}
          onChange={(event) => {
            setResultText(event.target.value);
            onChange({ ...draft, resultIds: parseIds(event.target.value) });
          }}
        />
      </Field>
      <Field className="gap-1.5">
        <FieldLabel htmlFor="overview-run-ids" className="text-xs">
          Run IDs
        </FieldLabel>
        <Input
          id="overview-run-ids"
          value={runText}
          placeholder={PLACEHOLDER}
          onChange={(event) => {
            setRunText(event.target.value);
            onChange({ ...draft, runIds: parseIds(event.target.value) });
          }}
        />
      </Field>
      <p className="text-xs text-muted-foreground">
        Only runs inside the selected date range are included.
      </p>
    </div>
  );
}
