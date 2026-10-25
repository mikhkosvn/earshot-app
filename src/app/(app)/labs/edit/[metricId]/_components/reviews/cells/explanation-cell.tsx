'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ExpandToggleButton } from './expand-toggle-button';

interface ExplanationCellProps {
  explanation: readonly string[];
}

const PREVIEW_ITEMS = 2;
const PREVIEW_CHARACTERS = 160;

const isLong = (explanation: readonly string[]) =>
  explanation.length > PREVIEW_ITEMS ||
  explanation.join(' ').length > PREVIEW_CHARACTERS;

export function ExplanationCell({ explanation }: ExplanationCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (explanation.length === 0) {
    return <span className="text-sm text-muted-foreground">-</span>;
  }

  return (
    <div className="flex w-56 flex-col items-start gap-1">
      <ul
        className={cn('ml-4 list-disc text-sm', !isExpanded && 'line-clamp-6')}
      >
        {explanation.map((line, index) => (
          <li key={`${index}-${line}`}>{line}</li>
        ))}
      </ul>
      <ExpandToggleButton
        canExpand={isLong(explanation)}
        isExpanded={isExpanded}
        collapsedLabel="Read more"
        onToggle={() => setIsExpanded((current) => !current)}
      />
    </div>
  );
}
