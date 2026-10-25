'use client';

import { SparklesIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { useAiModeForm } from '../../_hooks/use-ai-mode-form';
import { AiComposer } from './ai-composer';
import { AiSuggestionCards } from './ai-suggestion-cards';

export function AiModePanel() {
  const { form, onSubmit, isPending } = useAiModeForm();

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-1 flex-col items-center justify-between gap-8 p-6"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
            <SparklesIcon className="size-3.5 text-purple-600" />
            AI evaluator builder
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">
            What should this evaluator test?
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Describe a real conversation or failure mode. Earshot will turn it
            into test scenarios you can review and refine here.
          </p>
        </div>
        <div className="flex w-full max-w-4xl flex-col gap-2">
          <AiSuggestionCards />
          <AiComposer isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}
