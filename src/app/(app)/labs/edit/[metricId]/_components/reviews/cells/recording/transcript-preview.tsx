'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ExpandToggleButton } from '../expand-toggle-button';

type TranscriptPreviewProps = {
  lines: string[];
};

const PREVIEW_LINES = 2;

export function TranscriptPreview({ lines }: TranscriptPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (lines.length === 0) {
    return <p className="text-xs text-muted-foreground">No transcript</p>;
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <p
        className={cn(
          'text-sm whitespace-pre-line text-muted-foreground',
          !isExpanded && 'line-clamp-2',
        )}
      >
        {lines.join('\n')}
      </p>
      <ExpandToggleButton
        canExpand={lines.length > PREVIEW_LINES}
        isExpanded={isExpanded}
        collapsedLabel="Read More"
        onToggle={() => setIsExpanded((current) => !current)}
      />
    </div>
  );
}
