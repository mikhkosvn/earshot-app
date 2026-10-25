'use client';

import { useState } from 'react';

import { useEvaluatorListParams } from '../_hooks/use-evaluator-list-params';
import { EvaluatorsMain } from './evaluators-main';
import { EvaluatorsSidePanel } from './evaluators-side-panel';
import { FolderSidebar } from './folder-sidebar/folder-sidebar';

export function EvaluatorsLayout() {
  const [isImproveOpen, setImproveOpen] = useState(false);
  const [{ folder }] = useEvaluatorListParams();

  return (
    <div className="flex h-full min-h-0">
      <FolderSidebar />
      <EvaluatorsMain key={folder} onImproveOpen={() => setImproveOpen(true)} />
      <EvaluatorsSidePanel
        isImproveOpen={isImproveOpen}
        onImproveClose={() => setImproveOpen(false)}
      />
    </div>
  );
}
