import { ArrowUpRightIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { LabRowSource } from '@/server/labs/types';
import { SampleSourceLabel } from '@/server/metrics/constants/pattern-review/sample-source';

type SourceLinkProps = {
  source: LabRowSource;
};

export function SourceLink({ source }: SourceLinkProps) {
  if (!source.href) return null;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Open the source ${SampleSourceLabel[source.kind]}`}
            nativeButton={false}
            render={<Link href={source.href as Route} />}
          />
        }
      >
        <ArrowUpRightIcon />
      </TooltipTrigger>
      <TooltipContent>Open the source {SampleSourceLabel[source.kind]}</TooltipContent>
    </Tooltip>
  );
}
