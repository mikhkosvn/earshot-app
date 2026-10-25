'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import type { GenerateEvaluatorsFormValues } from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { Button } from '@/components/ui/button';

import { AI_SUGGESTIONS } from '../../_constants/create-mode';

export function AiSuggestionCards() {
  const { setValue } = useFormContext<GenerateEvaluatorsFormValues>();

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {AI_SUGGESTIONS.map((suggestion) => (
        <Button
          key={suggestion.title}
          type="button"
          variant="outline"
          className="h-10 justify-between bg-background font-normal"
          onClick={() =>
            setValue('extraInstructions', suggestion.prompt, {
              shouldDirty: true,
            })
          }
        >
          {suggestion.title}
          <ArrowUpRightIcon className="text-muted-foreground" />
        </Button>
      ))}
    </div>
  );
}
