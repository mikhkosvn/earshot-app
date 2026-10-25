'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { MetricService } from '../../_service';

interface SelectAllAgentsButtonsProps {
  onChange: (agentIds: number[]) => void;
}

export function SelectAllAgentsButtons({
  onChange,
}: SelectAllAgentsButtonsProps) {
  const projectId = useCurrentProjectId();
  const { data: agents } = useSuspenseQuery(
    MetricService.getAgentOptionsQuery({ projectId }),
  );

  return (
    <div className="flex gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => onChange(agents.map((agent) => agent.id))}
      >
        Select All
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => onChange([])}
      >
        Deselect All
      </Button>
    </div>
  );
}
