'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import { IdChip } from '@/components/common/clipboard/id-chip';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { CreateSavedViewInput } from '@/server/saved-views/types';

import { MetricService } from '../../_service';
import { toggleItem } from '../../_utils/toggle-item';

export function ViewAgentsField() {
  const [query, setQuery] = useState('');
  const projectId = useCurrentProjectId();
  const { control } = useFormContext<CreateSavedViewInput>();
  const { data: agents } = useSuspenseQuery(
    MetricService.getAgentOptionsQuery({ projectId }),
  );

  return (
    <Controller
      name="agentIds"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium">Select Agents</span>
          <div className="rounded-lg border">
            <div className="flex items-center gap-2 border-b px-2.5">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <Input
                value={query}
                placeholder="Search agents..."
                aria-label="Search agents..."
                className="h-8 border-none bg-transparent px-0 text-xs shadow-none focus-visible:ring-0 md:text-xs dark:bg-transparent"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto p-1">
              {filterByName(agents, query).map((agent) => (
                <label
                  key={agent.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted"
                >
                  <Checkbox
                    checked={field.value.includes(agent.id)}
                    onCheckedChange={(checked) =>
                      field.onChange(toggleItem(field.value, agent.id, checked))
                    }
                  />
                  <IdChip id={agent.id} />
                  <span className="truncate">{agent.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
}
