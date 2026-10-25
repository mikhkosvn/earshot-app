'use client';

import { HINT_TOKENS } from '@/app/(app)/test-case/_utils/evaluator-form/variable-tokens';
import { Button } from '@/components/ui/button';

type VariableHintProps = {
  onInsert: (token: string) => void;
};

export function VariableHint({ onInsert }: VariableHintProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
      Hint: Use
      <Button
        type="button"
        variant="outline"
        size="xs"
        className="font-mono font-normal"
        onClick={() => onInsert(HINT_TOKENS.pattern)}
      >
        {HINT_TOKENS.pattern}
      </Button>
      e.g.
      <Button
        type="button"
        variant="outline"
        size="xs"
        className="font-mono font-normal"
        onClick={() => onInsert(HINT_TOKENS.first)}
      >
        {HINT_TOKENS.first}
      </Button>
      or
      <Button
        type="button"
        variant="outline"
        size="xs"
        className="font-mono font-normal"
        onClick={() => onInsert(HINT_TOKENS.second)}
      >
        {HINT_TOKENS.second}
      </Button>
    </div>
  );
}
