'use client';

import { useQueryClient } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useCloseGenerationSheet } from '@/app/(app)/test-case/_hooks/generation/use-close-generation-sheet';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { Button } from '@/components/ui/button';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

type SaveScenariosFooterProps = {
  session: GenerationSessionView;
};

const scenarioCount = (count: number) => {
  if (count === 1) return '1 scenario';
  return `${count} scenarios`;
};

export function SaveScenariosFooter({ session }: SaveScenariosFooterProps) {
  const queryClient = useQueryClient();
  const closeSheet = useCloseGenerationSheet();
  const count = session.evaluators.length;

  return (
    <div className="flex flex-col gap-2 border-t p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs">{scenarioCount(count)} ready to save</span>
        <Button
          type="button"
          size="sm"
          disabled={count === 0}
          onClick={async () => {
            toast.success(`${scenarioCount(count)} kept successfully`);
            await closeSheet();
            await invalidateEvaluatorData(queryClient);
          }}
        >
          <CheckIcon />
          Save {scenarioCount(count)}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Save them first, then use Improve Scenarios from the Evaluators page to
        edit them.
      </p>
    </div>
  );
}
