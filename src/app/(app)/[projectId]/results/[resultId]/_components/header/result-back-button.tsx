'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export function ResultBackButton() {
  const projectId = useCurrentProjectId();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Back to results"
      nativeButton={false}
      render={<Link href={UrlGenerator.results({ projectId })} />}
    >
      <ArrowLeftIcon />
    </Button>
  );
}
