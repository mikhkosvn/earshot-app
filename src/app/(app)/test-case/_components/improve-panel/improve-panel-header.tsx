'use client';

import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon, WandSparklesIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EvaluatorService } from '../../_service';

interface ImprovePanelHeaderProps {
  scope: number;
  onClose: () => void;
}

export function ImprovePanelHeader({
  scope,
  onClose,
}: ImprovePanelHeaderProps) {
  const queryClient = useQueryClient();
  const startNewConversation = () => {
    const cache = queryClient.getMutationCache();
    for (const mutation of cache.findAll({
      mutationKey: EvaluatorService.proposeImprovementsMutationKey,
    })) {
      cache.remove(mutation);
    }
  };

  return (
    <div className="flex items-start gap-3 border-b p-3">
      <span className="rounded-lg border bg-purple-50 p-2 text-purple-600 dark:bg-purple-950">
        <WandSparklesIcon className="size-4" />
      </span>
      <div className="flex flex-1 flex-col">
        <h2 className="text-base font-semibold">Improve Scenarios</h2>
        <p className="text-xs text-muted-foreground">
          AI · filtered evaluators (up to {scope})
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="New conversation"
        onClick={startNewConversation}
      >
        <PlusIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Close Improve Scenarios"
        onClick={onClose}
      >
        <XIcon />
      </Button>
    </div>
  );
}
