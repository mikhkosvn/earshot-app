'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { CopyStateIcon } from './copy-state-icon';
import { useCopyToClipboard } from './use-copy-to-clipboard';

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({
  value,
  label = 'Copy',
  className,
}: CopyButtonProps) {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={label}
      className={cn('text-muted-foreground', className)}
      onClick={() => copy(value)}
    >
      <CopyStateIcon isCopied={isCopied} className="size-3" />
    </Button>
  );
}
