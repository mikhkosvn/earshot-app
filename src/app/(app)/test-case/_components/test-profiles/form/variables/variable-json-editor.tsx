'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

import type { VariableListName } from '../../../../_constants/variable-editor-mode';
import type { TestProfileFormValues } from '../../../../_schemas/test-profile-form-schema';
import {
  parseVariablesJson,
  variablesToJson,
} from '../../../../_utils/variables-json';
import { JsonErrorText } from './json-error-text';

type VariableJsonEditorProps = {
  name: VariableListName;
};

export function VariableJsonEditor({ name }: VariableJsonEditorProps) {
  const { getValues, setValue } = useFormContext<TestProfileFormValues>();
  const [text, setText] = useState(() => variablesToJson(getValues(name)));
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={text}
        aria-label="Variables as JSON"
        aria-invalid={error !== null}
        className="min-h-32 font-mono text-xs"
        onChange={(event) => {
          setText(event.target.value);
          const parsed = parseVariablesJson(event.target.value);
          setError(parsed.error);
          if (parsed.variables) {
            setValue(name, parsed.variables, { shouldDirty: true });
          }
        }}
      />
      <JsonErrorText error={error} />
    </div>
  );
}
