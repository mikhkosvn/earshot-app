'use client';

import { useIsMutating } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useAssignAgentsForm } from '../../_hooks/forms/use-assign-agents-form';
import { MetricService } from '../../_service';
import { AgentCheckboxList } from '../agents/agent-checkbox-list';

interface AssignAgentsFormProps {
  metricIds: number[];
  onSaved: () => void;
}

export function AssignAgentsForm({
  metricIds,
  onSaved,
}: AssignAgentsFormProps) {
  const { form, onSubmit } = useAssignAgentsForm(metricIds, onSaved);
  const isSaving =
    useIsMutating({ mutationKey: MetricService.assignAgentsMutationKey }) > 0;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="p-3">
        <Controller
          name="agentIds"
          control={form.control}
          render={({ field }) => (
            <AgentCheckboxList value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      <div className="flex justify-end gap-2 border-t p-3">
        <DialogClose
          render={<Button type="button" variant="outline" size="sm" />}
        >
          Cancel
        </DialogClose>
        <Button type="submit" size="sm" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
