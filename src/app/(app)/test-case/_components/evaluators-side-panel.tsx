'use client';

import dynamic from 'next/dynamic';

import { useGenerationSheetParams } from '../_hooks/generation/use-generation-sheet-params';
import { ImprovePanel } from './improve-panel/improve-panel';

const GenerationSheet = dynamic(
  () =>
    import('./generation-sheet/generation-sheet').then(
      (module) => module.GenerationSheet,
    ),
  { ssr: false },
);

type EvaluatorsSidePanelProps = {
  isImproveOpen: boolean;
  onImproveClose: () => void;
};

export function EvaluatorsSidePanel({
  isImproveOpen,
  onImproveClose,
}: EvaluatorsSidePanelProps) {
  const [{ reopenSheet }] = useGenerationSheetParams();

  if (reopenSheet) return <GenerationSheet />;
  if (isImproveOpen) return <ImprovePanel onClose={onImproveClose} />;
  return null;
}
