'use client';

import { XIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { DeepResearchModeView } from '@/server/insights/types';

import { useDismissModeMutation } from '../../_hooks/mutations/use-dismiss-mode-mutation';

type ResearchModeItemProps = {
  mode: DeepResearchModeView;
};

export function ResearchModeItem({ mode }: ResearchModeItemProps) {
  const projectId = useCurrentProjectId();
  const dismiss = useDismissModeMutation();

  return (
    <li className="flex flex-col gap-1.5 rounded-md border bg-muted/30 p-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium">
          {mode.rank}. {mode.title}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Dismiss ${mode.title}`}
          disabled={dismiss.isPending}
          onClick={() => dismiss.mutate({ failureModeId: mode.id })}
        >
          <XIcon />
        </Button>
      </div>
      <p className="text-[11px] text-muted-foreground">{mode.description}</p>
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-muted-foreground">{mode.callCount} calls</span>
        {mode.exampleCallLogIds.map((callLogId) => (
          <Link
            key={callLogId}
            href={UrlGenerator.calls({
              projectId,
              values: { callId: callLogId },
            })}
            className="text-primary underline underline-offset-2"
          >
            #{callLogId}
          </Link>
        ))}
      </div>
    </li>
  );
}
