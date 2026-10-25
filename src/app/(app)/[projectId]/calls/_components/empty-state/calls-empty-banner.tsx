import { PhoneCallIcon } from 'lucide-react';

import { AddCallButton } from '../add-call/add-call-button';

export function CallsEmptyBanner() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="flex size-8 items-center justify-center rounded-md border bg-background">
          <PhoneCallIcon className="size-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold">No call logs yet</h2>
          <p className="text-xs text-muted-foreground">
            Upload a recording or connect a provider to start monitoring calls.
          </p>
        </div>
      </div>
      <AddCallButton />
    </div>
  );
}
