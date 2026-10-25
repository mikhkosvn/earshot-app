'use client';

import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useConversation } from '../../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../../_service';

interface DownloadRecordingButtonProps {
  query: ConversationQueryArgs;
}

export function DownloadRecordingButton({
  query,
}: DownloadRecordingButtonProps) {
  const { recordingDownloadUrl } = useConversation(query);
  if (!recordingDownloadUrl) return null;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            aria-label="Download recording"
            render={<a href={recordingDownloadUrl} download />}
          />
        }
      >
        <DownloadIcon />
      </TooltipTrigger>
      <TooltipContent>Download recording</TooltipContent>
    </Tooltip>
  );
}
