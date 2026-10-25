'use client';

import { useSwitchProjectMutation } from '@/app/(app)/_hooks/mutations/project-switcher/use-switch-project-mutation';
import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { ProjectSummary } from '@/server/projects/types';

import { ProjectIdBadge } from './project-id-badge';

interface ProjectMenuRowProps {
  project: ProjectSummary;
}

export function ProjectMenuRow({ project }: ProjectMenuRowProps) {
  const currentProjectId = useCurrentProjectId();
  const switchProject = useSwitchProjectMutation();
  const isCurrent = project.id === currentProjectId;

  return (
    <DropdownMenuItem
      data-current={isCurrent}
      className="gap-2 text-xs data-[current=true]:bg-muted"
      onClick={() => {
        if (isCurrent) return;
        switchProject.mutate({ projectId: project.id });
      }}
    >
      <ProjectIdBadge projectId={project.id} />
      <span className="truncate font-medium">{project.name}</span>
    </DropdownMenuItem>
  );
}
