'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { CopyStateIcon } from './copy-state-icon';
import { useCopyToClipboard } from './use-copy-to-clipboard';

type IdChipProps = {
  id: number | string;
  className?: string;
};

export function IdChip({ id, className }: IdChipProps) {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={`Copy ID ${id}`}
      className={cn(
        'h-5 gap-1 rounded-sm border-border bg-muted px-1 font-mono text-xs font-normal text-muted-foreground hover:text-foreground',
        className,
      )}
      onClick={() => copy(String(id))}
    >
      {id}
      <CopyStateIcon isCopied={isCopied} className="size-3" />
    </Button>
  );
}
