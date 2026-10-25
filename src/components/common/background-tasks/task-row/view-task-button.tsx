'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { JobKind } from '@/generated/prisma/enums';

import { viewTaskLabel } from '../_utils/panel-labels';

type ViewTaskButtonProps = {
  deepLink: string | undefined;
  kind: JobKind;
};

export function ViewTaskButton({ deepLink, kind }: ViewTaskButtonProps) {
  if (!deepLink) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="self-end"
      nativeButton={false}
      render={<Link href={deepLink as Route} />}
    >
      {viewTaskLabel(kind)}
    </Button>
  );
}
