'use client';

import { ArrowUpIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { GenerateEvaluatorsFormValues } from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { AiComposerOptions } from './ai-composer-options';
import { AiMoreOptions } from './ai-more-options';

interface AiComposerProps {
  isPending: boolean;
}

export function AiComposer({ isPending }: AiComposerProps) {
  const [isMoreOpen, setMoreOpen] = useState(false);
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();
  const description = useWatch({ control, name: 'extraInstructions' });
  const canGenerate = description.trim().length > 0 && !isPending;

  return (
    <div className="flex flex-col rounded-xl border bg-background shadow-sm">
      <AiComposerOptions
        isMoreOpen={isMoreOpen}
        onMoreToggle={() => setMoreOpen(!isMoreOpen)}
      />
      <AiMoreOptions isOpen={isMoreOpen} />
      <Controller
        name="extraInstructions"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            aria-label="Evaluator description"
            placeholder="Describe the scenario, the persona, and anything the agent must get right..."
            className="min-h-20 resize-none rounded-none border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
            onKeyDown={(event) => {
              if (event.key !== 'Enter' || event.shiftKey) return;
              event.preventDefault();
              if (canGenerate) event.currentTarget.form?.requestSubmit();
            }}
          />
        )}
      />
      <div className="flex items-center justify-between px-3 pb-3">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CheckIcon className="size-3 text-green-600" />
          Ready to generate · Enter to generate
        </span>
        <Button type="submit" size="sm" disabled={!canGenerate}>
          Generate
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
}
