'use client';

import { Button } from '@/components/ui/button';

import { IMPROVE_SUGGESTIONS } from '../../_constants/improve-suggestions';

type ImproveEmptyStateProps = {
  scope: number;
  onSend: (prompt: string) => void;
};

export function ImproveEmptyState({ scope, onSend }: ImproveEmptyStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto p-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-base font-semibold">Improve these evaluators</h3>
        <p className="text-xs text-muted-foreground">
          filtered evaluators (up to {scope}) are loaded and ready to edit.
        </p>
      </div>
      <p className="text-center text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        Try asking me to
      </p>
      <div className="flex flex-col gap-2">
        {IMPROVE_SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion.title}
            type="button"
            variant="outline"
            className="h-auto flex-col items-start gap-0.5 px-3 py-2 text-left whitespace-normal"
            onClick={() => onSend(suggestion.title)}
          >
            <span className="text-sm font-medium">{suggestion.title}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {suggestion.subtitle}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
