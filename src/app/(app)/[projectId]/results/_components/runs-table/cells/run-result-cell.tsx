'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

type RunResultCellProps = {
  resultId: number;
};

export function RunResultCell({ resultId }: RunResultCellProps) {
  const projectId = useCurrentProjectId();

  return (
    <Link
      href={UrlGenerator.result({ projectId, resultId })}
      aria-label={`Go to result: ${resultId}`}
      className="inline-flex items-center gap-1 font-medium tabular-nums hover:underline"
    >
      {resultId}
      <ArrowUpRightIcon className="size-3" />
    </Link>
  );
}
