'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRightIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useIsStartingRun } from '../_hooks/use-is-starting-run';
import { RunDialogService } from '../_service';
import { StartRunLabel } from './start-run-label';

type ConfigureRunFooterProps = {
  evaluatorIds: number[];
};

export function ConfigureRunFooter({ evaluatorIds }: ConfigureRunFooterProps) {
  const projectId = useCurrentProjectId();
  const { data: maxConcurrentRuns } = useSuspenseQuery({
    ...RunDialogService.getDefaultsQuery({ projectId, evaluatorIds }),
    select: (defaults) => defaults.maxConcurrentRuns,
  });
  const isStarting = useIsStartingRun();

  return (
    <DialogFooter className="items-center sm:justify-between">
      <Button
        variant="link"
        size="sm"
        className="px-0 text-muted-foreground"
        nativeButton={false}
        render={<Link href={UrlGenerator.settingsOrgGeneral()} />}
      >
        Max concurrent: {maxConcurrentRuns}
        <ArrowUpRightIcon />
      </Button>
      <Button type="submit" disabled={isStarting}>
        <PlayIcon />
        <StartRunLabel />
      </Button>
    </DialogFooter>
  );
}
