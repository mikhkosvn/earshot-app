import { ListChecksIcon } from 'lucide-react';

import { RubricSaveButton } from './rubric-save-button';

export function RubricHeaderCard() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-background px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40">
          <ListChecksIcon className="size-4" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h1 className="text-base font-semibold text-foreground">Rubric</h1>
          <p className="text-xs text-muted-foreground">
            Define the conditions that decide whether a conversation is marked a{' '}
            <span className="font-medium text-foreground">success</span> or{' '}
            <span className="font-medium text-foreground">failure</span>.
          </p>
        </div>
      </div>
      <RubricSaveButton />
    </div>
  );
}
