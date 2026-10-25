'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { FolderKanbanIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionSelect } from '../option-select';

interface ProjectSelectProps {
  id?: string;
  value: number;
  onValueChange: (projectId: number) => void;
}

export function ProjectSelect({
  id,
  value,
  onValueChange,
}: ProjectSelectProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getProjectsQuery({ projectId }),
    select: (projects) =>
      projects.map((project) => ({ value: project.id, label: project.name })),
  });

  return (
    <OptionSelect
      id={id}
      items={items}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
      placeholder="Select project"
      icon={<FolderKanbanIcon className="text-muted-foreground" />}
    />
  );
}
