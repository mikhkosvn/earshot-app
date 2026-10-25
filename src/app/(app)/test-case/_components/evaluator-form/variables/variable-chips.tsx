'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ViewMoreButton } from './view-more-button';

const VISIBLE_TOKENS = 4;

const visibleTokens = (tokens: readonly string[], isExpanded: boolean) => {
  if (isExpanded) return tokens;
  return tokens.slice(0, VISIBLE_TOKENS);
};

interface VariableChipsProps {
  tokens: readonly string[];
  onInsert: (token: string) => void;
}

export function VariableChips({ tokens, onInsert }: VariableChipsProps) {
  const [isExpanded, setExpanded] = useState(false);
  const visible = visibleTokens(tokens, isExpanded);

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span className="text-muted-foreground">Available Variables</span>
      {visible.map((token) => (
        <Button
          key={token}
          type="button"
          variant="outline"
          size="xs"
          className="font-mono font-normal"
          onClick={() => onInsert(token)}
        >
          {token}
        </Button>
      ))}
      <ViewMoreButton
        hiddenCount={tokens.length - visible.length}
        onExpand={() => setExpanded(true)}
      />
    </div>
  );
}
