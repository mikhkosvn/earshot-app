'use client';

import { SparklesIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ReviewTaskPanelHeaderProps = {
  title: string;
  onClose: () => void;
};

export function ReviewTaskPanelHeader({
  title,
  onClose,
}: ReviewTaskPanelHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5">
      <SparklesIcon className="size-4 shrink-0" aria-hidden />
      <h2 className="flex-1 truncate text-sm font-medium">{title}</h2>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Close panel"
        onClick={onClose}
      >
        <XIcon />
      </Button>
    </div>
  );
}
