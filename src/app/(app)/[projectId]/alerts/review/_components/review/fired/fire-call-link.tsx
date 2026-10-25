'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

interface FireCallLinkProps {
  callLogId: number | null;
}

export function FireCallLink({ callLogId }: FireCallLinkProps) {
  const projectId = useCurrentProjectId();

  if (callLogId === null) return null;
  return (
    <Link
      href={UrlGenerator.calls({ projectId, values: { callId: callLogId } })}
      className="text-[11px] text-primary underline underline-offset-2"
    >
      Open call #{callLogId}
    </Link>
  );
}
