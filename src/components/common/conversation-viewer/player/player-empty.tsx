import { AudioLinesIcon } from 'lucide-react';

export function PlayerEmpty() {
  return (
    <div className="m-3 flex items-center gap-2 rounded-lg border border-dashed px-4 py-6 text-sm text-muted-foreground">
      <AudioLinesIcon className="size-4" />
      No recording is available for this conversation.
    </div>
  );
}
