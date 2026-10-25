'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { isTimeExpression } from '@/lib/time-range/parse-time-expression';

import type { TimeRange } from './time-range';

type AbsoluteRangeFormProps = TimeRange & {
  onApply: (range: TimeRange) => void;
};

const INVALID_TIME = 'Enter a time such as now-30d or 2026-10-01 00:00:00.';

const errorOf = (value: string) => {
  if (isTimeExpression(value)) return undefined;
  return { message: INVALID_TIME };
};

const shownErrors = (
  submitted: boolean,
  error: { message: string } | undefined,
) => {
  if (!submitted) return [];
  return [error];
};

export function AbsoluteRangeForm({
  from,
  to,
  onApply,
}: AbsoluteRangeFormProps) {
  const [draft, setDraft] = useState<TimeRange>({ from, to });
  const [submitted, setSubmitted] = useState(false);
  const fromError = errorOf(draft.from);
  const toError = errorOf(draft.to);

  return (
    <form
      noValidate
      className="flex w-1/2 flex-col gap-3 border-r p-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (fromError || toError) return;
        onApply({ from: draft.from.trim(), to: draft.to.trim() });
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Absolute time range</h3>
        <span className="text-xs text-muted-foreground">Local</span>
      </div>
      <Field data-invalid={submitted && Boolean(fromError)} className="gap-1">
        <FieldLabel htmlFor="time-range-from" className="text-xs">
          From
        </FieldLabel>
        <Input
          id="time-range-from"
          value={draft.from}
          placeholder="YYYY-MM-DD HH:mm:ss or now-6h"
          className="text-xs md:text-xs"
          onChange={(event) =>
            setDraft((current) => ({ ...current, from: event.target.value }))
          }
        />
        <FieldError
          errors={shownErrors(submitted, fromError)}
          className="text-xs"
        />
      </Field>
      <Field data-invalid={submitted && Boolean(toError)} className="gap-1">
        <FieldLabel htmlFor="time-range-to" className="text-xs">
          To
        </FieldLabel>
        <Input
          id="time-range-to"
          value={draft.to}
          placeholder="YYYY-MM-DD HH:mm:ss or now"
          className="text-xs md:text-xs"
          onChange={(event) =>
            setDraft((current) => ({ ...current, to: event.target.value }))
          }
        />
        <FieldError
          errors={shownErrors(submitted, toError)}
          className="text-xs"
        />
      </Field>
      <Button type="submit" size="sm" className="self-start">
        Apply time range
      </Button>
    </form>
  );
}
