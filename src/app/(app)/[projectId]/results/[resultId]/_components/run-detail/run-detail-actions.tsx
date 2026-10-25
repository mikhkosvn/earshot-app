'use client';

import { FlaskConicalIcon, Repeat2Icon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { MonitorPreset } from '@/components/common/monitor-dialog/_constants/monitor-preset';
import { CreateMonitorDialog } from '@/components/common/monitor-dialog/create-monitor-dialog';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useAddRunConversationToLabMutation } from '../../../_hooks/mutations/run-detail/use-add-run-conversation-to-lab-mutation';
import { useRunDetailQuery } from '../../../_hooks/runs/use-run-detail-query';
import { evaluatorIdsOf } from '../../../_utils/runs/run-detail-text';

interface RunDetailActionsProps {
  runId: number;
}

export function RunDetailActions({ runId }: RunDetailActionsProps) {
  const [monitorOpen, setMonitorOpen] = useState(false);
  const { data: run } = useRunDetailQuery(runId);
  const addToLab = useAddRunConversationToLabMutation();

  return (
    <>
      <Button
        size="sm"
        className="text-xs"
        disabled={addToLab.isPending}
        onClick={() => addToLab.mutate(run.conversationId)}
      >
        <FlaskConicalIcon />
        Add to Lab
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setMonitorOpen(true)}
      >
        <Repeat2Icon />
        Monitor this daily
      </Button>
      <DialogClose
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Close"
            className="ml-auto"
          />
        }
      >
        <XIcon />
      </DialogClose>
      <CreateMonitorDialog
        open={monitorOpen}
        onOpenChange={setMonitorOpen}
        agentId={run.agent?.id ?? null}
        evaluatorIds={evaluatorIdsOf(run)}
        preset={MonitorPreset.qualityCheck}
      />
    </>
  );
}
