'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import type { TranscriptFormValues } from '../../_schemas/transcript-form-schema';

export function MessageCount() {
  const { control } = useFormContext<TranscriptFormValues>();
  const turns = useWatch({ control, name: 'turns' });
  const count = turns.filter((turn) => turn.content.trim()).length;

  return (
    <p className="text-xs text-muted-foreground">
      {count} messages · Agent on left, caller on right
    </p>
  );
}
