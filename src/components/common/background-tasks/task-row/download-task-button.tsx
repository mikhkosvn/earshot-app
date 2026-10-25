'use client';

import { Button } from '@/components/ui/button';

type DownloadTaskButtonProps = {
  href: string;
};

export function DownloadTaskButton({ href }: DownloadTaskButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="self-end"
      nativeButton={false}
      render={<a href={href} download />}
    >
      Download
    </Button>
  );
}
