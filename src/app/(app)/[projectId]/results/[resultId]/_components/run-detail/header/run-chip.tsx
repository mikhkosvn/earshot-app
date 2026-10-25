import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';

import { CopyButton } from '@/components/common/clipboard/copy-button';

import { RunChipLink } from './run-chip-link';

interface RunChipProps {
  icon: LucideIcon;
  text: string | null;
  copyLabel: string;
  linkLabel?: string;
  href?: Route | null;
}

export function RunChip({
  icon: Icon,
  text,
  copyLabel,
  linkLabel,
  href = null,
}: RunChipProps) {
  if (text === null) return null;

  return (
    <span className="inline-flex max-w-80 min-w-0 items-center gap-1">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate">{text}</span>
      <CopyButton value={text} label={copyLabel} />
      <RunChipLink href={href} label={linkLabel} />
    </span>
  );
}
