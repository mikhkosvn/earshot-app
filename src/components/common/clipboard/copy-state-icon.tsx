import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CopyStateIconProps {
  isCopied: boolean;
  className?: string;
}

export function CopyStateIcon({ isCopied, className }: CopyStateIconProps) {
  if (isCopied) {
    return <CheckIcon className={cn('text-green-600', className)} />;
  }
  return <CopyIcon className={className} />;
}
