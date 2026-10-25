'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type ViewTaskButtonProps = {
  deepLink: string | undefined;
};

export function ViewTaskButton({ deepLink }: ViewTaskButtonProps) {
  if (!deepLink) return null;

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
