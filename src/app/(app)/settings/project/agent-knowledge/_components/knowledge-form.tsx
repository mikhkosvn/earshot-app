'use client';

import { FormProvider } from 'react-hook-form';

import { useKnowledgeForm } from '../_hooks/use-knowledge-form';
import { VersionHistoryButton } from './history/version-history-button';
import { KnowledgeEditor } from './knowledge-editor';
import { KnowledgeSaveButton } from './knowledge-save-button';

export function KnowledgeForm() {
  const { form, onSubmit } = useKnowledgeForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-background px-4 py-3 md:flex-row">
          <div className="flex max-w-xl min-w-0 flex-1 flex-col gap-1">
            <h1 className="text-base font-semibold">Agent knowledge</h1>
            <p className="text-xs text-muted-foreground">
              What every improvement run in this project must know before it
              proposes a change — wording you have to keep, an escalation path,
              a tone. Saved as a new version each time, so you can read back
              what changed.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <VersionHistoryButton />
            <KnowledgeSaveButton />
          </div>
        </div>
        <KnowledgeEditor />
      </form>
    </FormProvider>
  );
}
