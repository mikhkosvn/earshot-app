'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { AutoOptimiseMetricsCard } from './auto-optimise/auto-optimise-metrics-card';
import { ProjectGeneralForm } from './project-general-form';

export function ProjectGeneralSection() {
  const projectId = useCurrentProjectId();

  return (
    <div className="flex flex-col gap-3">
      <ProjectGeneralForm key={projectId} />
      <AutoOptimiseMetricsCard />
    </div>
  );
}
