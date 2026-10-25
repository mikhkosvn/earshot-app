'use client';

import { CopyButton } from '@/components/common/clipboard/copy-button';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

interface CreatedApiKeyPanelProps {
  plainKey: string;
  onDone: () => void;
}

export function CreatedApiKeyPanel({
  plainKey,
  onDone,
}: CreatedApiKeyPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>API Key Created</DialogTitle>
        <DialogDescription>
          Copy the key now. You cannot see the full key again after you close
          this dialog.
        </DialogDescription>
      </DialogHeader>
      <InputGroup>
        <InputGroupInput
          value={plainKey}
          readOnly
          aria-label="New API key"
          className="font-mono text-xs"
          onFocus={(event) => event.currentTarget.select()}
        />
        <InputGroupAddon align="inline-end">
          <CopyButton value={plainKey} label="Copy API key" />
        </InputGroupAddon>
      </InputGroup>
      <DialogFooter>
        <Button type="button" size="sm" onClick={onDone}>
          Done
        </Button>
      </DialogFooter>
    </div>
  );
}
