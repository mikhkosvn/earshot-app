'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { JobKind } from '@/generated/prisma/enums';

import { DownloadTaskButton } from './download-task-button';

type ViewTaskButtonProps = {
  deepLink: string | undefined;
  kind: JobKind;
};

export function ViewTaskButton({ deepLink, kind }: ViewTaskButtonProps) {
  if (!deepLink) return null;
  if (kind === JobKind.export) return <DownloadTaskButton href={deepLink} />;

  return (
    <Button
      variant="outline"
      size="sm"
      className="self-end"
      nativeButton={false}
      render={<Link href={deepLink as Route} />}
    >
      View
    </Button>
  );
}
