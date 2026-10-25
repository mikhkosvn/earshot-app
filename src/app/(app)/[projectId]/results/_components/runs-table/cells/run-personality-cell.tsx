'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { NamedRef } from '@/server/results/types';

import { namedRefText } from '../../../_utils/runs/run-format';

interface RunPersonalityCellProps {
  personality: NamedRef | null;
}

export function RunPersonalityCell({ personality }: RunPersonalityCellProps) {
  const projectId = useCurrentProjectId();

  if (!personality) return null;

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      {namedRefText(personality)}
      <Link
        href={UrlGenerator.personalityEdit({
          personalityId: personality.id,
          values: { project: projectId },
        })}
        aria-label={`Go to personality: ${personality.name}`}
        className="text-muted-foreground hover:text-foreground"
      >
        <ArrowUpRightIcon className="size-3" />
      </Link>
    </span>
  );
}
