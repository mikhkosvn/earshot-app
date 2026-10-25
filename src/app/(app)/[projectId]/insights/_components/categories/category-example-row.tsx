'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { RelativeTime } from '@/components/common/relative-time';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { CategoryExample } from '@/server/insights/types';

type CategoryExampleRowProps = {
  example: CategoryExample;
};

export function CategoryExampleRow({ example }: CategoryExampleRowProps) {
  const projectId = useCurrentProjectId();

  return (
    <li className="flex flex-col gap-0.5 rounded-md border bg-muted/30 px-2 py-1.5">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={UrlGenerator.calls({
            projectId,
            values: { callId: example.callLogId },
          })}
          className="truncate text-[11px] text-primary underline underline-offset-2"
        >
          Call {example.externalCallId ?? `#${example.callLogId}`}
        </Link>
        <RelativeTime date={example.assignedAt} />
      </div>
      <p className="text-[11px] leading-snug">{example.explanation}</p>
    </li>
  );
}
