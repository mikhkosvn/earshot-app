'use client';

import { CopyButton } from '@/components/common/clipboard/copy-button';

import { useConversation } from '../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../_service';
import { transcriptText } from '../_utils/transcript-text';

type TranscriptHeaderProps = {
  query: ConversationQueryArgs;
};

export function TranscriptHeader({ query }: TranscriptHeaderProps) {
  const { turns } = useConversation(query);

  return (
    <div className="flex items-center justify-between border-b px-3">
      <span className="border-b-2 border-foreground py-2 text-sm font-medium">
        Transcript
      </span>
      <CopyButton
        value={transcriptText(turns)}
        label="Copy transcript"
        className="size-7"
      />
    </div>
  );
}
