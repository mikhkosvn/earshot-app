'use client';

import dynamic from 'next/dynamic';

import { useGenerationSheetParams } from '../_hooks/generation/use-generation-sheet-params';
import { useImprovePanelParams } from '../_hooks/improve/use-improve-panel-params';
import { ImprovePanel } from './improve-panel/improve-panel';

const GenerationSheet = dynamic(
  () =>
    import('./generation-sheet/generation-sheet').then(
      (module) => module.GenerationSheet,
    ),
  { ssr: false },
);

export function EvaluatorsSidePanel() {
  const [{ reopenSheet }] = useGenerationSheetParams();
  const [{ improve }, setImproveParams] = useImprovePanelParams();

  if (reopenSheet) return <GenerationSheet />;
  if (improve)
    return <ImprovePanel onClose={() => setImproveParams({ improve: null })} />;
  return null;
}
