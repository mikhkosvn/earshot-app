'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export function BackToLabsButton() {
  const projectId = useCurrentProjectId();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Back to Labs"
      nativeButton={false}
      render={<Link href={UrlGenerator.labs({ values: { project: projectId } })} />}
    >
      <ArrowLeftIcon />
    </Button>
  );
}
