'use client';

import { format } from 'date-fns';

import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';

import { useOrganizationSettings } from '../../_hooks/use-organization-settings';

export function OrganizationProjectsCard() {
  const { projects } = useOrganizationSettings();

  return (
    <SettingsCard>
      <h2 className="text-base font-semibold">Projects</h2>
      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-4 rounded-md border px-4 py-3"
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-sm font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">
                Project ID: {project.id}
              </p>
            </div>
            <p
              className="shrink-0 text-xs text-muted-foreground"
              suppressHydrationWarning
            >
              Created: {format(project.createdAt, 'M/d/yyyy')}
            </p>
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}
