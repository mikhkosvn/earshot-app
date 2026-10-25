'use client';

import { SparklesIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useImproveTextMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluator-ai/use-improve-text-mutation';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Button } from '@/components/ui/button';
import {
  EvaluatorTextKind,
  type EvaluatorTextKind as TextKind,
} from '@/server/evaluators/constants/evaluator-text-kind';

interface ImproveTextButtonProps {
  kind: TextKind;
}

const fieldOf = (kind: TextKind) => {
  if (kind === EvaluatorTextKind.expectedOutcome) {
    return 'expectedOutcomePrompt' as const;
  }
  return 'instructions' as const;
};

export function ImproveTextButton({ kind }: ImproveTextButtonProps) {
  const projectId = useCurrentProjectId();
  const { getValues, setValue } = useFormContext<EvaluatorFormValues>();
  const improveText = useImproveTextMutation();
  const name = fieldOf(kind);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border-purple-300 text-purple-700 hover:text-purple-800 dark:border-purple-800 dark:text-purple-300"
      disabled={improveText.isPending}
      onClick={() => {
        const text = getValues(name);
        if (!text.trim()) {
          toast.error('Write some text first, then use Improve.');
          return;
        }
        improveText.mutate(
          { projectId, agentId: getValues('agentId'), kind, text },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              setValue(name, result.data.text, {
                shouldDirty: true,
                shouldValidate: true,
              });
              toast.success('The text is improved. Review it before you save.');
            },
          },
        );
      }}
    >
      <SparklesIcon />
      Improve
    </Button>
  );
}
