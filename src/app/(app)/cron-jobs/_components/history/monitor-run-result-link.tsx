import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { MonitorRunItem } from '@/server/monitors/types';

type MonitorRunResultLinkProps = {
  run: MonitorRunItem;
};

export function MonitorRunResultLink({ run }: MonitorRunResultLinkProps) {
  if (run.resultId === null) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <Link
      href={UrlGenerator.result({
        projectId: run.projectId,
        resultId: run.resultId,
      })}
      className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
    >
      Result #{run.resultId}
      <ArrowUpRightIcon className="size-3" />
    </Link>
  );
}
