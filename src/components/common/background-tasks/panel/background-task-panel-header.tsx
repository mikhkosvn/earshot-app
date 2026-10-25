'use client';

import { SparklesIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { minimizeLabel } from '../_utils/minimize-label';
import { MinimizePanelIcon } from './minimize-panel-icon';

type BackgroundTaskPanelHeaderProps = {
  title: string;
  minimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
};

export function BackgroundTaskPanelHeader({
  title,
  minimized,
  onToggleMinimize,
  onClose,
}: BackgroundTaskPanelHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b px-3 py-2.5">
      <SparklesIcon className="size-4 shrink-0" aria-hidden />
      <h2 className="flex-1 truncate text-sm font-medium">{title}</h2>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={minimizeLabel(minimized)}
        aria-expanded={!minimized}
        onClick={onToggleMinimize}
      >
        <MinimizePanelIcon minimized={minimized} />
      </Button>
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
