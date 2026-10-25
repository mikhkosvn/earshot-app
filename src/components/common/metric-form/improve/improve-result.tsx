'use client';

import { Button } from '@/components/ui/button';
import type { ActionResult } from '@/lib/action-result';
import type { ImprovedMetric } from '@/server/metrics/types';

import { ImproveEdgeCases } from './improve-edge-cases';
import { ImproveTextPanel } from './improve-text-panel';

type ImproveResultProps = {
  result: ActionResult<ImprovedMetric> | undefined;
  currentText: string;
  onUse: (refinedText: string) => void;
};

export function ImproveResult({
  result,
  currentText,
  onUse,
}: ImproveResultProps) {
  if (!result?.ok) return null;

  return (
    <div className="flex min-h-0 flex-col gap-3 overflow-y-auto">
      <div className="grid gap-3 md:grid-cols-2">
        <ImproveTextPanel title="Current" text={currentText} />
        <ImproveTextPanel title="Refined" text={result.data.refinedText} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Summary</p>
        <p className="text-sm text-muted-foreground">{result.data.summary}</p>
      </div>
      <ImproveEdgeCases edgeCases={result.data.resolvedEdgeCases} />
      <Button
        type="button"
        className="self-end"
        onClick={() => onUse(result.data.refinedText)}
      >
        Use this metric
      </Button>
    </div>
  );
}
