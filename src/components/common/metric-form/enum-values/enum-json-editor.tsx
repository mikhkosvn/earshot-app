'use client';

import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import {
  enumJsonError,
  formatEnumJson,
  parseEnumJson,
} from '../_utils/enum-json';

export function EnumJsonEditor() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const { field } = useController({ name: 'enumValues', control });
  const [text, setText] = useState(() => formatEnumJson(field.value));
  const error = enumJsonError(text);

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={text}
        disabled={field.disabled}
        aria-label="Enum keys as JSON"
        aria-invalid={Boolean(error)}
        className="min-h-28 font-mono text-xs"
        placeholder='["resolved", "transferred", "dropped"]'
        onBlur={field.onBlur}
        onChange={(event) => {
          setText(event.target.value);
          const parsed = parseEnumJson(event.target.value);
          if (parsed) field.onChange(parsed);
        }}
      />
      <FieldError errors={[error]} />
    </div>
  );
}
