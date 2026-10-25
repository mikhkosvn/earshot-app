'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGroupCorrection } from '../../../_hooks/use-group-correction';
import { useIsSavingCorrection } from '../../../_hooks/use-is-saving-correction';
import { usePatternGroup } from '../../../_hooks/use-pattern-group';
import { numberDraftOf } from '../../../_utils/metric-value-text';

type NumberScoreInputProps = {
  groupKey: string;
};

export function NumberScoreInput({ groupKey }: NumberScoreInputProps) {
  const { correction } = usePatternGroup(groupKey);
  const { setScore } = useGroupCorrection(groupKey);
  const isSaving = useIsSavingCorrection();
  const [draft, setDraft] = useState(() => numberDraftOf(correction));
  const score = Number(draft);
  const isValid = draft.trim() !== '' && Number.isFinite(score);

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        step="any"
        inputMode="decimal"
        aria-label="Score"
        placeholder="Score"
        value={draft}
        className="h-7 w-24 bg-background"
        onChange={(event) => setDraft(event.target.value)}
      />
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={!isValid || isSaving}
        onClick={() => setScore(score)}
      >
        Set
      </Button>
    </div>
  );
}
