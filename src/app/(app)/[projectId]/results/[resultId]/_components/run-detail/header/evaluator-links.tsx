'use client';

import { EyeIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { buttonVariants } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

interface EvaluatorLinksProps {
  evaluatorId: number | null;
}

const ICON_LINK = buttonVariants({
  variant: 'ghost',
  size: 'icon-xs',
  className: 'text-muted-foreground',
});

export function EvaluatorLinks({ evaluatorId }: EvaluatorLinksProps) {
  const projectId = useCurrentProjectId();

  if (evaluatorId === null) return null;

  const href = UrlGenerator.evaluator({
    evaluatorId,
    values: { project: projectId },
  });

  return (
    <>
      <Link href={href} aria-label="View evaluator" className={ICON_LINK}>
        <EyeIcon />
      </Link>
      <Link href={href} aria-label="Edit evaluator" className={ICON_LINK}>
        <PencilIcon />
      </Link>
    </>
  );
}
