'use client';

import { useIsMutating } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '@/components/ui/dialog';
import type { MetricListItem } from '@/server/metrics/types';

import { useManageMetricForm } from '../../_hooks/forms/use-manage-metric-form';
import { MetricService } from '../../_service';
import { AgentCheckboxList } from '../agents/agent-checkbox-list';
import { SelectAllAgentsButtons } from '../agents/select-all-agents-buttons';

interface ManageMetricFormProps {
  metric: MetricListItem;
  onSaved: () => void;
}

export function ManageMetricForm({ metric, onSaved }: ManageMetricFormProps) {
  const { form, onSubmit } = useManageMetricForm(metric, onSaved);
  const isSaving =
    useIsMutating({ mutationKey: MetricService.updateAgentsMutationKey }) > 0;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-3 p-3">
        <Controller
          name="agentIds"
          control={form.control}
          render={({ field }) => (
            <>
              <SelectAllAgentsButtons onChange={field.onChange} />
              <Controller
                name="addToNewAgents"
                control={form.control}
                render={({ field: addField }) => (
                  <label className="flex cursor-pointer items-center gap-2 text-xs">
                    <Checkbox
                      checked={addField.value}
                      onCheckedChange={addField.onChange}
                    />
                    Automatically add to new agents
                  </label>
                )}
              />
              <AgentCheckboxList
                value={field.value}
                onChange={field.onChange}
              />
            </>
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
          Save Changes
        </Button>
      </div>
    </form>
  );
}
