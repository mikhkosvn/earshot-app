'use client';

import { Input } from '@/components/ui/input';

import { useGroupCorrection } from '../../../_hooks/use-group-correction';
import { usePatternGroup } from '../../../_hooks/use-pattern-group';

interface CorrectionNoteFieldProps {
  groupKey: string;
}

export function CorrectionNoteField({ groupKey }: CorrectionNoteFieldProps) {
  const { correction } = usePatternGroup(groupKey);
  const { saveNote } = useGroupCorrection(groupKey);

  if (!correction) return null;

  return (
    <Input
      key={correction.note}
      aria-label="Why? (optional)"
      placeholder="Why? (optional)"
      defaultValue={correction.note}
      maxLength={2000}
      className="bg-background"
      onBlur={(event) => saveNote(event.target.value)}
    />
  );
}
