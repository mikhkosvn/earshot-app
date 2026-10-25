'use client';

import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

type VariablesJsonEditorProps = {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
};

export function VariablesJsonEditor({
  value,
  error,
  onChange,
}: VariablesJsonEditorProps) {
  return (
    <Field data-invalid={error !== null} className="gap-1.5">
      <Textarea
        value={value}
        spellCheck={false}
        aria-label="Variables JSON"
        aria-invalid={error !== null}
        className="min-h-48 font-mono text-xs"
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldDescription>
        Each entry must have a name and a description
      </FieldDescription>
      <FieldError>{error}</FieldError>
    </Field>
  );
}
