'use client';

import { Share2Icon } from 'lucide-react';

import { CopyButton } from '@/components/common/clipboard/copy-button';
import { Button } from '@/components/ui/button';

import { useShareCallMutation } from '../../../_hooks/mutations/call-actions/use-share-call-mutation';

interface CallTitleRowProps {
  callLogId: number;
  callId: string;
}

export function CallTitleRow({ callLogId, callId }: CallTitleRowProps) {
  const share = useShareCallMutation();

  return (
    <div className="flex items-center gap-1.5 pr-8">
      <h2 className="truncate text-base font-semibold">{callId}</h2>
      <CopyButton value={callId} label="Copy call ID" className="border" />
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Share call"
        disabled={share.isPending}
        className="border text-muted-foreground"
        onClick={() => share.mutate(callLogId)}
      >
        <Share2Icon />
      </Button>
    </div>
  );
}
